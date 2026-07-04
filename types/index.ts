export interface PickupLocation {
  Latitude: number;
  Longitude: number;
}

export interface Unicorn {
  Name: string;
  Color: string;
  Gender: 'Male' | 'Female';
}

export interface RideRequest {
  PickupLocation: PickupLocation;
}

export interface RideResponse {
  Unicorn: Unicorn;
  ETD?: string;
}

export interface CognitoError {
  code?: string;
  name?: string;
  message: string;
}

export interface FormState {
  email: string;
  password: string;
  confirmPassword?: string;
  code?: string;
}

export type AuthStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AuthResult {
  status: AuthStatus;
  message: string;
}

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}
