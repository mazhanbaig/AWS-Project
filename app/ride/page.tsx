'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { getAuthToken, signOut } from '@/lib/cognito';
import { requestUnicorn } from '@/lib/api';
import { awsConfig } from '@/lib/aws-config';
import type { MapCoordinates, RideResponse } from '@/types';
import type { MapApi } from '@/components/MapContainer';

const MapContainer = dynamic(() => import('@/components/MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] rounded-xl bg-surface-100 animate-pulse flex items-center justify-center text-surface-400 text-sm">
      Loading map…
    </div>
  ),
});

export default function RidePage() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tokenReady, setTokenReady] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<MapCoordinates | null>(null);
  const [status, setStatus] = useState<'selecting' | 'requesting' | 'arriving' | 'arrived' | 'error'>('selecting');
  const [message, setMessage] = useState('Welcome! Click the map to set your pickup location.');
  const [unicorn, setUnicorn] = useState<RideResponse['Unicorn'] | null>(null);
  const [error, setError] = useState('');
  const mapApiRef = useRef<MapApi | null>(null);

  useEffect(() => {
    getAuthToken()
      .then((token) => {
        if (token) {
          router.push('/signin');
          return;
        }
        setAuthToken(token);
        setTokenReady(true);
      })
      .catch(() => {
        router.push('/signin');
      });
  }, [router]);

  const handleMapReady = useCallback((api: MapApi) => {
    mapApiRef.current = api;
  }, []);

  const handlePickupChange = useCallback((coords: MapCoordinates) => {
    setPickupLocation(coords);
    setStatus('selecting');
    setMessage('Pickup location set. Click "Request Unicorn" to continue.');
    setError('');
  }, []);

  async function handleRequest() {
    if (!pickupLocation || !authToken) return;

    setStatus('requesting');
    setMessage('Requesting your unicorn…');
    setError('');

    try {
      const result = await requestUnicorn(pickupLocation, authToken);
      setUnicorn(result.Unicorn);
      setStatus('arriving');

      const pronoun = result.Unicorn.Gender === 'Male' ? 'his' : 'her';
      setMessage(
        `${result.Unicorn.Name}, your ${result.Unicorn.Color} unicorn, is on ${pronoun} way.`
      );

      if (mapApiRef.current) {
        const center = mapApiRef.current.getCenter();
        const extent = mapApiRef.current.getExtent();
        const dest = pickupLocation;

        let originLat: number;
        if (dest.latitude > center.latitude) {
          originLat = extent.minLat;
        } else {
          originLat = extent.maxLat;
        }

        let originLng: number;
        if (dest.longitude > center.longitude) {
          originLng = extent.minLng;
        } else {
          originLng = extent.maxLng;
        }

        mapApiRef.current.animateUnicorn(
          { latitude: originLat, longitude: originLng },
          dest,
          () => {
            setStatus('arrived');
            setMessage(`${result.Unicorn.Name} has arrived. Giddy up!`);
            mapApiRef.current?.clearPickup();
            setPickupLocation(null);
          }
        );
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An error occurred when requesting your unicorn.');
      setMessage('Failed to request a unicorn. Please try again.');
    }
  }

  function handleSignOut() {
    signOut();
    router.push('/');
  }

  if (!tokenReady) {
    return (
      <div className="container-wide py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-8 h-8 border-2 border-surface-300 border-t-brand-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-surface-500">Verifying authentication…</p>
        </div>
      </div>
    );
  }

  const noApi = !awsConfig.api.invokeUrl;

  return (
    <div className="container-wide py-8">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
        {/* Map */}
        <div className="flex-1 relative min-h-[400px] rounded-xl overflow-hidden border border-surface-200">
          <MapContainer
            onPickupChange={handlePickupChange}
            onMapReady={handleMapReady}
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <Card className="shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900">Your Ride</h2>
              <button
                onClick={handleSignOut}
                className="text-xs text-surface-400 hover:text-surface-600 transition-colors"
              >
                Sign out
              </button>
            </div>

            <div className="space-y-3">
              {noApi ? (
                <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-700">
                  <p className="font-medium mb-1">Successfully Authenticated!</p>
                  <p className="text-amber-600">
                    This page is not functional yet because there is no API invoke URL
                    configured in{' '}
                    <code className="text-xs">lib/aws-config.ts</code>.
                    You&apos;ll configure this in Module 3.
                  </p>
                  {authToken && (
                    <div className="mt-3">
                      <p className="text-xs text-amber-500 mb-1">Auth token:</p>
                      <textarea
                        readOnly
                        value={authToken}
                        className="w-full text-xs font-mono bg-white/50 border border-amber-200 rounded p-2 h-20 resize-none"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        pickupLocation ? 'bg-emerald-500' : 'bg-surface-300'
                      }`}
                    />
                    <span className="text-surface-600">
                      {pickupLocation
                        ? `Pickup: ${pickupLocation.latitude.toFixed(4)}, ${pickupLocation.longitude.toFixed(4)}`
                        : 'No pickup selected'}
                    </span>
                  </div>

                  {error && (
                    <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <Button
                    onClick={handleRequest}
                    disabled={!pickupLocation || status === 'requesting'}
                    loading={status === 'requesting'}
                    className="w-full"
                    size="lg"
                  >
                    {status === 'requesting'
                      ? 'Requesting…'
                      : status === 'arriving' || status === 'arrived'
                      ? 'Request Sent'
                      : 'Request Unicorn'}
                  </Button>
                </>
              )}
            </div>
          </Card>

          {/* Updates */}
          <Card className="flex-1 overflow-auto">
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Updates</h3>
            <ol className="space-y-2">
              <li className="text-sm text-surface-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                <span>{message}</span>
              </li>
              {unicorn && (
                <li className="text-sm text-surface-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>
                    {unicorn.Name}, a {unicorn.Color} unicorn, is assigned to your ride.
                  </span>
                </li>
              )}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
