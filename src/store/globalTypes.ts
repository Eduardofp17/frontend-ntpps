import { AuthState } from './modules/auth/types';
import { RegisterState } from './modules/register/types';

export interface States {
  authReducer: AuthState;
  registerReducer: RegisterState;
}
export interface CardapioModel {
  dayname: string;
  breakfast?: string;
  lunch?: string;
  afternoonsnack?: string;
  position: number;
}
