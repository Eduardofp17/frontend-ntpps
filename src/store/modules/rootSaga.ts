import { all, takeLatest } from 'redux-saga/effects';
import { AuthTypes, PersistRehydrat } from './auth/types';
import { authRequest, persisRehydrate, authLoggoutRequest } from './auth/sagas';
import { RegisterTypes } from './register/types';
import { registerRequest } from './register/sagas';
import { DeleteCardapioTypes } from './DeleteCardapio/types';
import { deleteCardapioRequest } from './DeleteCardapio/sagas';
import { UpdateCardapioTypes } from './UpdateCardapio/types';
import { updateCardapioRequest } from './UpdateCardapio/sagas';
import { AcceptRequestTypes } from './AcceptRequest/types';
import { AcceptRequestRequest } from './AcceptRequest/sagas';
export default function* rootSaga() {
  yield all([takeLatest(AuthTypes.AuthRequest, authRequest)]);
  yield all([takeLatest(AuthTypes.AuthLoggoutRequest, authLoggoutRequest)]);
  yield all([takeLatest(PersistRehydrat, persisRehydrate)]);
  yield all([takeLatest(RegisterTypes.RegisterRequest, registerRequest)]);
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
}
