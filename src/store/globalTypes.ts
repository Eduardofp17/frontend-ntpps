import { AuthState } from './modules/auth/types';
import { RegisterState } from './modules/register/types';
import { DeleteCardapioState } from './modules/DeleteCardapio/types';
import { UpdateCardapioState } from './modules/UpdateCardapio/types';
import { AcceptRequestState } from './modules/AcceptRequest/types';
import { RejectRequestState } from './modules/RejectRequest/types';

export interface States {
  authReducer: AuthState;
  registerReducer: RegisterState;
  deleteCardapioReducer: DeleteCardapioState;
  updateCardapioReducer: UpdateCardapioState;
  acceptRequestReducer: AcceptRequestState;
  rejectRequestReducer: RejectRequestState;
}
export interface CardapioModel {
  id: number;
  dayname: string;
  breakfast?: string;
  lunch?: string;
  afternoonsnack?: string;
  position: number;
  weeknumber?: number;
}

export interface Response {
  data: {
    token: string;
    level: number;
    school_id: number;
  };
}

export interface Request {
  id: number;
  nome: string;
  sobrenome?: string;
  verified: boolean;
  email: string;
}
