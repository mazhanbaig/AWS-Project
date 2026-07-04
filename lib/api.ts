import { awsConfig } from './aws-config';
import type { RideRequest, RideResponse } from '@/types';

export async function requestUnicorn(
  pickupLocation: { latitude: number; longitude: number },
  authToken: string
): Promise<RideResponse> {
  if (!awsConfig.api.invokeUrl) {
    throw new Error('API invoke URL is not configured. Check lib/aws-config.ts');
  }

  const body: RideRequest = {
    PickupLocation: {
      Latitude: pickupLocation.latitude,
      Longitude: pickupLocation.longitude,
    },
  };

  const response = await fetch(`${awsConfig.api.invokeUrl}/ride`, {
    method: 'POST',
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`An error occurred when requesting your unicorn: ${text}`);
  }

  const result: RideResponse = await response.json();
  return result;
}
