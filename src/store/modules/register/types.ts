export enum RegisterTypes {
  RegisterRequest = 'register/RegisterRequest',
  RegisterSuccess = 'register/RegisterSuccess',
  RegisterFailure = 'register/RegisterFailure',
}

export interface RegisterState {
  readonly token: string;
  readonly loading: boolean;
  readonly error: boolean;
  readonly loggedIn: boolean;
  readonly errorMessage: string[];
}

export interface GetRegisterState {
  registerReducer: RegisterState;
}

export const PersistRehydrat = 'persist/REHYDRATE';
