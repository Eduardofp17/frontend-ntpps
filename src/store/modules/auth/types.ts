export enum AuthTypes {
  AuthRequest = 'auth/AuthRequest',
  AuthSuccess = 'auth/AuthSuccess',
  AuthFailure = 'auth/AuthFailure',
  AuthLoggoutRequest = 'auth/AuthLoggoutRequest',
  AuthLoggout = 'auth/AuthLoggout',
}

export interface AuthState {
  readonly token: string;
  readonly loading: boolean;
  readonly error: boolean;
  readonly data: PayloadApi;
  readonly loggedIn: boolean;
  readonly errorMessage: string[];
  readonly level: number;
  readonly school_id: number;
  readonly creation: number;
  readonly expiration: number;
  readonly room_id?: number;
  readonly room_name?: string;
}

export interface PayloadApi {
  readonly email: string;
  readonly password: string;
}

export const PersistRehydrat = 'persist/REHYDRATE';
