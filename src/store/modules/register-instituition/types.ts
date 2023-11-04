export enum RegisterInstituitionTypes {
  RegisterInstituitionRequest = 'RegisterInstituition/RegisterInstituitionRequest',
  RegisterInstituitionSuccess = 'RegisterInstituition/RegisterInstituitionSuccess',
  RegisterInstituitionFailure = 'RegisterInstituition/RegisterInstituitionFailure',
}

export interface RegisterInstituitionState {
  readonly loading: boolean;
  readonly error: boolean;
  readonly errorMessage: string;
  readonly registered: boolean;
}

export interface GetRegisterInstituitionState {
  registerReducer: RegisterInstituitionState;
}

export interface RegisterInstituitionErrors {
  readonly created: boolean;
  readonly msg: string;
}

export interface Payloadpi {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly cnpj: string;
  readonly agreeWithTermsAndPrivacyPolicy: boolean;
  readonly school_modality: string;
  readonly forms_of_education: string;
  readonly isPublic: boolean;
  readonly cep: string;
  readonly state: string;
  readonly city: string;
  readonly address: string;
  readonly neighborhood: string;
}

export const PersistRehydrat = 'persist/REHYDRATE';
