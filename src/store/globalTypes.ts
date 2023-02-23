import { AuthState } from './modules/auth/types';
import { RegisterState } from './modules/register/types';

export interface States {
  authReducer: AuthState;
  registerReducer: RegisterState;
}
