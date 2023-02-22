import { action } from 'typesafe-actions';
import { RegisterTypes } from './types';

interface PayloadApi {
  email: string;
  password: string;
}
export const RegisterRequest = (payload: PayloadApi) =>
  action(RegisterTypes.RegisterRequest, payload);
export const RegisterSuccess = (token: string) =>
  action(RegisterTypes.RegisterSuccess, token);
export const RegisterFailure = () => action(RegisterTypes.RegisterFailure);
