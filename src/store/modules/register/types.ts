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
  readonly errorMessage: RegisterErrors;
  readonly registered: boolean;
}

export interface GetRegisterState {
  registerReducer: RegisterState;
}

export interface RegisterPayload {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly code?: string;
  readonly lastname?: string;
  readonly cnpj?: string;
}

export interface RegisterErrors {
  readonly created: boolean;
  readonly msg: string;
}
export const PersistRehydrat = 'persist/REHYDRATE';
