import { AuthState } from './modules/auth/types';
import { RegisterState } from './modules/register/types';
import { DeleteCardapioState } from './modules/DeleteCardapio/types';
import { UpdateCardapioState } from './modules/UpdateCardapio/types';
export interface States {
  authReducer: AuthState;
  registerReducer: RegisterState;
  deleteCardapioReducer: DeleteCardapioState;
  updateCardapioReducer: UpdateCardapioState;
}
export interface CardapioModel {
  id: number;
  dayname: string;
  breakfast?: string;
  lunch?: string;
  afternoonsnack?: string;
  position: number;
}

export interface Response {
  data: {
    token: string;
    level: number;
  };
}
