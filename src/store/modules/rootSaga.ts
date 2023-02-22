import { all, takeLatest } from 'redux-saga/effects';
import { authRequest, persisRehydrate } from './auth/sagas';
import { registerRequest } from './register/sagas';
import { AuthTypes, PersistRehydrat } from './auth/types';
import { RegisterTypes } from './register/types';
export default function* rootSaga() {
  yield all([takeLatest(AuthTypes.AuthRequest, authRequest)]);
  yield all([takeLatest(PersistRehydrat, persisRehydrate)]);
  yield all([takeLatest(RegisterTypes.RegisterRequest, registerRequest)]);
}
