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

  const formattedExpiration = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(expiration));

  const loggedIn = payload.authReducer.loggedIn;

  if (
    loggedIn &&
    formattedExpiration <=
      new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo',
      }).format(new Date())
  )
    yield put();
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export function* authLoggoutRequest() {
  yield put(AuthLoggout());
}
