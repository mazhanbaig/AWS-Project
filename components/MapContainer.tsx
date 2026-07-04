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

declare global {
  interface Window {
    require?: (deps: string[], callback: (...args: unknown[]) => void) => void;
  }
}

type MapConstructor = { new(p: { basemap: string }): Record<string, unknown> };

type ArcGISHost = {
  Map: MapConstructor;
  MapView: { new(p: Record<string, unknown>): Record<string, unknown> };
  Graphic: { new(p: Record<string, unknown>): Record<string, unknown> };
  Point: { new(p: { longitude: number; latitude: number }): { longitude: number; latitude: number } };
  TextSymbol: { new(p: Record<string, unknown>): Record<string, unknown> };
  PictureMarkerSymbol: { new(p: Record<string, unknown>): Record<string, unknown> };
  webMercatorUtils: { xyToLngLat: (x: number, y: number) => [number, number] };
};

export default function MapContainer({ onPickupChange, onMapReady }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapApiRef = useRef<MapApi | null>(null);
  const arcgisLoaded = useRef(false);

  const initMap = useCallback(() => {
    if (!mapRef.current || !window.require || arcgisLoaded.current) return;
    arcgisLoaded.current = true;

    window.require(
      [
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/symbols/TextSymbol',
        'esri/symbols/PictureMarkerSymbol',
        'esri/geometry/support/webMercatorUtils',
        'dojo/domReady!',
      ],
      function (this: unknown, ...args: unknown[]) {
        const [MapCtor, MapViewCtor, GraphicCtor, PointCtor, TextSymbolCtor, PictureMarkerSymbolCtor, webMercator] =
          args as [
            MapConstructor,
            ArcGISHost['MapView'],
            ArcGISHost['Graphic'],
            ArcGISHost['Point'],
            ArcGISHost['TextSymbol'],
            ArcGISHost['PictureMarkerSymbol'],
            ArcGISHost['webMercatorUtils'],
          ];

        const map = new MapCtor({ basemap: 'gray-vector' });
        const view = new MapViewCtor({
          center: [-122.31, 47.6],
          container: mapRef.current,
          map,
          zoom: 12,
        }) as Record<string, unknown>;

        let pinGraphic: Record<string, unknown> | null = null;
        let unicornGraphic: Record<string, unknown> | null = null;
        let selectedPoint: MapCoordinates | null = null;
        let center: MapCoordinates = { latitude: 47.6, longitude: -122.31 };
        let extent = { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };

        function updateCenter(newValue: { latitude: number; longitude: number }) {
          center = { latitude: newValue.latitude, longitude: newValue.longitude };
        }

        function updateExtent(newValue: { xmin: number; ymin: number; xmax: number; ymax: number }) {
          const min = webMercator.xyToLngLat(newValue.xmin, newValue.ymin);
          const max = webMercator.xyToLngLat(newValue.xmax, newValue.ymax);
          extent = { minLng: min[0], minLat: min[1], maxLng: max[0], maxLat: max[1] };
        }

        const watch = view.watch as (prop: string, cb: (...args: unknown[]) => void) => void;
        watch('extent', (newValue: unknown) => updateExtent(newValue as { xmin: number; ymin: number; xmax: number; ymax: number }));
        watch('center', (newValue: unknown) => updateCenter(newValue as { latitude: number; longitude: number }));

        const viewThen = view.then as (cb: () => void) => void;
        viewThen(() => {
          updateExtent(view.extent as { xmin: number; ymin: number; xmax: number; ymax: number });
          updateCenter(view.center as { latitude: number; longitude: number });
        });

        const pinSymbol = new TextSymbolCtor({
          color: '#4f46e5',
          text: '\ue61d',
          font: { size: 24, family: 'CalciteWebCoreIcons' },
        });

        const unicornSymbol = new PictureMarkerSymbolCtor({
          url: '/images/unicorn-icon.png',
          width: '30px',
          height: '30px',
        });

        const onEvent = view.on as (event: string, cb: (event: { mapPoint: { latitude: number; longitude: number } }) => void) => void;
        onEvent('click', (event) => {
          selectedPoint = {
            latitude: event.mapPoint.latitude,
            longitude: event.mapPoint.longitude,
          };

          const graphics = view.graphics as { remove: (g: Record<string, unknown> | null) => void; add: (g: Record<string, unknown>) => void };
          if (pinGraphic) {
            graphics.remove(pinGraphic);
          }

          pinGraphic = new GraphicCtor({
            symbol: pinSymbol,
            geometry: new PointCtor({
              longitude: selectedPoint.longitude,
              latitude: selectedPoint.latitude,
            }),
          });

          graphics.add(pinGraphic);

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
            const graphics = view.graphics as { remove: (g: Record<string, unknown> | null) => void; add: (g: Record<string, unknown>) => void };

            function step(timestamp: number) {
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const deltaLat = (dest.latitude - origin.latitude) * progress;
              const deltaLon = (dest.longitude - origin.longitude) * progress;

              const point = new PointCtor({
                longitude: origin.longitude + deltaLon,
                latitude: origin.latitude + deltaLat,
              });

              if (unicornGraphic) {
                graphics.remove(unicornGraphic);
              }

              unicornGraphic = new GraphicCtor({
                geometry: point,
                symbol: unicornSymbol,
              });

              graphics.add(unicornGraphic);

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                callback();
              }
            }

            requestAnimationFrame(step);
          },
          clearPickup: () => {
            const graphics = view.graphics as { remove: (g: Record<string, unknown> | null) => void };
            if (pinGraphic) {
              graphics.remove(pinGraphic);
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
      }
    );
  }, [onPickupChange, onMapReady]);

  useEffect(() => {
    if (arcgisLoaded.current) return;

    const script = document.createElement('script');
    script.src = 'https://js.arcgis.com/4.6/';
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

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
