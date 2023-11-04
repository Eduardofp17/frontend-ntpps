export enum RegisterUserTypes {
  RegisterUserRequest = 'RegisterUser/RegisterUserRequest',
  RegisterUserSuccess = 'RegisterUser/RegisterUserSuccess',
  RegisterUserFailure = 'RegisterUser/RegisterUserFailure',
}

export interface RegisterUserState {
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorMessage: string;
  readonly registered: boolean;
}

export interface GetRegisterUserState {
  registerReducer: RegisterUserState;
}

export interface RegisterUserErrors {
  readonly created: boolean;
  readonly msg: string;
}

export interface Payloadpi {
  readonly name: string;
  readonly lastname: string;
  readonly isMale: boolean;
  readonly email: string;
  readonly password: string;
  readonly code: string;
  readonly acceptedTermsandPrivacyPolicy: boolean;
  readonly birthday: string;
}
export const PersistRehydrat = 'persist/REHYDRATE';
