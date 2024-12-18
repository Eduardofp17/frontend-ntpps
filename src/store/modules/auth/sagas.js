import { put, call } from 'redux-saga/effects';
import { AuthFailure, AuthSuccess, AuthLoggout } from './index';
import axios from '../../../services/axios';
import { get } from 'lodash';

export function* authRequest({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(axios.post, '/token/', {
      email,
      password,
    });
    yield put(AuthSuccess(response));
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
  } catch (e) {
    yield put(AuthFailure(e));
  }
}

export function* persisRehydrate({ payload }) {
  const token = get(payload, 'authReducer.token');
  const expiration = payload.authReducer.expiration;
  if (!expiration) {
    return;
  }

  const formattedExpiration = new Date(expiration).getTime();
  const date = new Date().getTime();
  const loggedIn = payload.authReducer.loggedIn;

  if (loggedIn && formattedExpiration <= date) yield put(AuthLoggout());
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export function* authLoggoutRequest() {
  yield put(AuthLoggout());
}
