'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { MapCoordinates } from '@/types';

interface MapContainerProps {
  onPickupChange?: (coords: MapCoordinates) => void;
  onMapReady?: (api: MapApi) => void;
}

export interface MapApi {
  setPickupLocation: (coords: MapCoordinates) => void;
  animateUnicorn: (origin: MapCoordinates, dest: MapCoordinates, callback: () => void) => void;
  clearPickup: () => void;
  getCenter: () => MapCoordinates;
  getExtent: () => { minLat: number; maxLat: number; minLng: number; maxLng: number };
  selectedPoint: MapCoordinates | null;
}

const arcgisImport = new Function('url', 'return import(url)');

const ARCGIS_BASE = 'https://js.arcgis.com/4.28/@arcgis/core';

function xyToLngLat(x: number, y: number): [number, number] {
  const R = 6378137;
  const lng = x * 180 / (Math.PI * R);
  const lat = (Math.atan(Math.exp(y / R)) * 2 - Math.PI / 2) * 180 / Math.PI;
  return [lng, lat];
}

export default function MapContainer({ onPickupChange, onMapReady }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapApiRef = useRef<MapApi | null>(null);
  const arcgisLoaded = useRef(false);

  const initMap = useCallback(async () => {
    if (!mapRef.current || arcgisLoaded.current) return;
    arcgisLoaded.current = true;

    try {
      const [MapModule, MapViewModule, GraphicModule, PointModule, TextSymbolModule, PictureMarkerModule] = await Promise.all([
        arcgisImport(`${ARCGIS_BASE}/Map.js`),
        arcgisImport(`${ARCGIS_BASE}/views/MapView.js`),
        arcgisImport(`${ARCGIS_BASE}/Graphic.js`),
        arcgisImport(`${ARCGIS_BASE}/geometry/Point.js`),
        arcgisImport(`${ARCGIS_BASE}/symbols/TextSymbol.js`),
        arcgisImport(`${ARCGIS_BASE}/symbols/PictureMarkerSymbol.js`),
      ]);

      const Map = MapModule.default;
      const MapView = MapViewModule.default;
      const Graphic = GraphicModule.default;
      const Point = PointModule.default;
      const TextSymbol = TextSymbolModule.default;
      const PictureMarkerSymbol = PictureMarkerModule.default;

      const map = new Map({ basemap: 'gray-vector' });
      const view = new MapView({
        center: [-122.31, 47.6],
        container: mapRef.current,
        map,
        zoom: 12,
      });

      let pinGraphic: InstanceType<typeof Graphic> | null = null;
      let unicornGraphic: InstanceType<typeof Graphic> | null = null;
      let selectedPoint: MapCoordinates | null = null;
      let center: MapCoordinates = { latitude: 47.6, longitude: -122.31 };
      let extent = { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };

      const updateCenter = (newValue: { latitude: number; longitude: number }) => {
        center = { latitude: newValue.latitude, longitude: newValue.longitude };
      };

      const updateExtent = (newValue: { xmin: number; ymin: number; xmax: number; ymax: number }) => {
        const min = xyToLngLat(newValue.xmin, newValue.ymin);
        const max = xyToLngLat(newValue.xmax, newValue.ymax);
        extent = { minLng: min[0], minLat: min[1], maxLng: max[0], maxLat: max[1] };
      };

      view.watch('extent', (newValue: unknown) => updateExtent(newValue as { xmin: number; ymin: number; xmax: number; ymax: number }));
      view.watch('center', (newValue: unknown) => updateCenter(newValue as { latitude: number; longitude: number }));

      view.when(() => {
        updateExtent(view.extent as { xmin: number; ymin: number; xmax: number; ymax: number });
        updateCenter(view.center as { latitude: number; longitude: number });
      });

      const pinSymbol = new TextSymbol({
        color: '#4f46e5',
        text: '\ue61d',
        font: { size: 24, family: 'CalciteWebCoreIcons' },
      });

      const unicornSymbol = new PictureMarkerSymbol({
        url: '/images/unicorn-icon.png',
        width: '30px',
        height: '30px',
      });

      view.on('click', (event: { mapPoint: { latitude: number; longitude: number } }) => {
        const pt = event.mapPoint;
        selectedPoint = {
          latitude: pt.latitude,
          longitude: pt.longitude,
        };

        if (pinGraphic) {
          view.graphics.remove(pinGraphic);
        }

        pinGraphic = new Graphic({
          symbol: pinSymbol,
          geometry: new Point({
            longitude: selectedPoint.longitude,
            latitude: selectedPoint.latitude,
          }),
        });

        view.graphics.add(pinGraphic);

        if (onPickupChange) {
          onPickupChange(selectedPoint);
        }
      });

      const mapApi: MapApi = {
        setPickupLocation: (coords: MapCoordinates) => {
          selectedPoint = coords;
        },
        animateUnicorn: (origin: MapCoordinates, dest: MapCoordinates, callback: () => void) => {
          const startTime = performance.now();
          const duration = 2000;

          const step = (timestamp: number) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const deltaLat = (dest.latitude - origin.latitude) * progress;
            const deltaLon = (dest.longitude - origin.longitude) * progress;

            const point = new Point({
              longitude: origin.longitude + deltaLon,
              latitude: origin.latitude + deltaLat,
            });

            if (unicornGraphic) {
              view.graphics.remove(unicornGraphic);
            }

            unicornGraphic = new Graphic({
              geometry: point,
              symbol: unicornSymbol,
            });

            view.graphics.add(unicornGraphic);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              callback();
            }
          }

          requestAnimationFrame(step);
        },
        clearPickup: () => {
          if (pinGraphic) {
            view.graphics.remove(pinGraphic);
            pinGraphic = null;
          }
          selectedPoint = null;
        },
        getCenter: () => center,
        getExtent: () => extent,
        selectedPoint: null,
      };

      mapApiRef.current = mapApi;

      if (onMapReady) {
        onMapReady(mapApi);
      }
    } catch (err) {
      console.error('Failed to load ArcGIS:', err);
      arcgisLoaded.current = false;
    }
  }, [onPickupChange, onMapReady]);

  useEffect(() => {
    if (arcgisLoaded.current) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${ARCGIS_BASE}/assets/esri/themes/light/main.css`;
    document.head.appendChild(link);

    initMap();

    return () => {
      arcgisLoaded.current = false;
    };
  }, [initMap]);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px] rounded-xl overflow-hidden"
    />
  );
}
