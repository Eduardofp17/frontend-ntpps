export enum AuthTypes {
  AuthRequest = 'auth/AuthRequest',
  AuthSuccess = 'auth/AuthSuccess',
  AuthFailure = 'auth/AuthFailure',
}

export interface AuthState {
  readonly token: string;
  readonly loading: boolean;
  readonly error: boolean;
  readonly data: PayloadApi;
  readonly loggedIn: boolean;
  readonly errorMessage: string[];
}

export interface GetAuthState {
  authReducer: AuthState;
}
export interface PayloadApi {
  readonly email: string;
  readonly password: string;
}

export const PersistRehydrat = 'persist/REHYDRATE';
