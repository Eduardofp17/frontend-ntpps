import { all, takeLatest } from 'redux-saga/effects';
import { AuthTypes, PersistRehydrat } from './auth/types';
import { authRequest, persisRehydrate, authLoggoutRequest } from './auth/sagas';
import { RegisterUserTypes } from './register-user/types';
import { registerUserRequest } from './register-user/sagas';
import { RegisterInstituitionTypes } from './register-instituition/types';
import { registerInstituitionRequest } from './register-instituition/sagas';
import { DeleteCardapioTypes } from './DeleteCardapio/types';
import { deleteCardapioRequest } from './DeleteCardapio/sagas';
import { UpdateCardapioTypes } from './UpdateCardapio/types';
import { updateCardapioRequest } from './UpdateCardapio/sagas';
import { AcceptRequestTypes } from './AcceptRequest/types';
import { AcceptRequestRequest } from './AcceptRequest/sagas';
import { RejectRequestTypes } from './RejectRequest/types';
import { RejectRequestRequest } from './RejectRequest/sagas';
import { UpdateUserRoleTypes } from './Update-user-role/types';
import { UpdateUserRoleRequest } from './Update-user-role/sagas';
import { DeleteUserTypes } from './ban-user/types';
import { DeleteUserRequest } from './ban-user/sagas';
import { UpdateFrequencyRequest } from './UpdateFrequency/sagas';
import { UpdateFrequencyTypes } from './UpdateFrequency/types';
import { UpdateStudentTypes } from './Update-student/types';
import { UpdateStudentRequest } from './Update-student/sagas';

export default function* rootSaga() {
  yield all([takeLatest(AuthTypes.AuthRequest, authRequest)]);
  yield all([takeLatest(AuthTypes.AuthLoggoutRequest, authLoggoutRequest)]);
  yield all([takeLatest(PersistRehydrat, persisRehydrate)]);
  yield all([
    takeLatest(RegisterUserTypes.RegisterUserRequest, registerUserRequest),
  ]);
  yield all([
    takeLatest(
      RegisterInstituitionTypes.RegisterInstituitionRequest,
      registerInstituitionRequest,
    ),
  ]);
  yield all([
    takeLatest(
      DeleteCardapioTypes.DeleteCardapioRequest,
      deleteCardapioRequest,
    ),
  ]);
  yield all([
    takeLatest(
      UpdateCardapioTypes.UpdateCardapioRequest,
      updateCardapioRequest,
    ),
  ]);
  yield all([
    takeLatest(AcceptRequestTypes.AcceptRequestRequest, AcceptRequestRequest),
  ]);
  yield all([
    takeLatest(RejectRequestTypes.RejectRequestRequest, RejectRequestRequest),
  ]);
  yield all([
    takeLatest(
      UpdateUserRoleTypes.UpdateUserRoleRequest,
      UpdateUserRoleRequest,
    ),
  ]);
  yield all([takeLatest(DeleteUserTypes.DeleteUserRequest, DeleteUserRequest)]);
  yield all([
    takeLatest(
      UpdateFrequencyTypes.UpdateFrequencyRequest,
      UpdateFrequencyRequest,
    ),
  ]);
  yield all([
    takeLatest(UpdateStudentTypes.UpdateStudentRequest, UpdateStudentRequest),
  ]);
}
