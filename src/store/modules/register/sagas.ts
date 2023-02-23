import { put, call } from 'redux-saga/effects';
import { RegisterSuccess, RegisterFailure } from './index';
import axios from '../../../services/axios';

export function* registerRequest({ payload }) {
  try {
    if (payload.cnpj) {
      const { name, email, cnpj, password } = payload;

      const response: string = yield call(axios.post, '/school/', {
        name,
        email,
        cnpj,
        password,
      });
      yield put(RegisterSuccess(response));
      return;
    }
    const { name, lastname, email, code, password } = payload;
    const response: string = yield call(axios.post, '/requests/', {
      nome: name,
      sobrenome: lastname,
      email,
      code,
      password,
    });
    yield put(RegisterSuccess(response));
    return;
  } catch (e) {
    yield put(RegisterFailure(e.response.data));
  }
}
