import { AuthState } from './modules/auth/types';
import { RegisterState } from './modules/register/types';
import { DeleteCardapioState } from './modules/DeleteCardapio/types';
import { UpdateCardapioState } from './modules/UpdateCardapio/types';
import { AcceptRequestState } from './modules/AcceptRequest/types';
import { RejectRequestState } from './modules/RejectRequest/types';
import { UpdateUserRoleState } from './modules/Update-user-role/types';
import { DeleteUserState } from './modules/ban-user/types';
import { UpdateFrequencyState } from './modules/UpdateFrequency/types';
import { UpdateStudentState } from './modules/Update-student/types';
export interface States {
  authReducer: AuthState;
  registerReducer: RegisterState;
  deleteCardapioReducer: DeleteCardapioState;
  updateCardapioReducer: UpdateCardapioState;
  acceptRequestReducer: AcceptRequestState;
  rejectRequestReducer: RejectRequestState;
  updateUserRoleReducer: UpdateUserRoleState;
  deleteUserReducer: DeleteUserState;
  updateFrequencyReducer: UpdateFrequencyState;
  updateStudentReducer: UpdateStudentState;
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
    room_id?: number;
    room_name?: string;
  };
}

export interface Request {
  id: number;
  nome: string;
  sobrenome?: string;
  verified: boolean;
  email: string;
}

export interface Class {
  id: number;
  name: string;
  selected: boolean;
  school_id: number;
  Students: Student[];
  created_at: string;
  updated_at: string;
}
export interface Student {
  id: number;
  name: string;
  room_id: number;
  created_at: string;
  updated_at: string;
}
export interface School {
  id: number;
  name: string;
  email: string;
  cnpj: string;
  code: string;
  accepting_accounts: boolean;
  cardapios: CardapioModel[];
}

export type Classes = {
  class_01: boolean;
  class_02: boolean;
  class_03: boolean;
  class_04: boolean;
  class_05: boolean;
  class_06: boolean;
  class_07: boolean;
  class_08: boolean;
  class_09: boolean;
};
export type frequency = Classes & {
  id: number;
  updated_by: string;
  school_id: number;
  room_id: number;
  student_id: number;
  created_at: string;
  updated_at: string;
};

//Provisório
export interface Room {
  id: number;
  sala: string;
  qtd_presentes: number;
  selected: boolean;
  updated_at: string;
  updated_by: string;
}
