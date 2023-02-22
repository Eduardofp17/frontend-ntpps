import { action } from 'typesafe-actions';
import { AuthTypes } from './types';

interface PayloadApi {
  email: string;
  password: string;
}
export const AuthRequest = (payload: PayloadApi) =>
  action(AuthTypes.AuthRequest, payload);
export const AuthSuccess = (token: string) =>
  action(AuthTypes.AuthSuccess, token);
export const AuthFailure = () => action(AuthTypes.AuthFailure);
