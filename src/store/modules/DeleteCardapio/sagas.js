import { put, call } from 'redux-saga/effects';
import { DeleteCardapioSuccess, DeleteCardapioFailure } from './index';
import axios from '../../../services/axios';

export function* deleteCardapioRequest({ payload }) {
  try {
    axios.defaults.headers.Authorization = `Bearer ${payload.token}`;
    const response = yield call(axios.delete, `/cardapio/${payload.id}`);
    yield put(DeleteCardapioSuccess(response));

    return;
  } catch (e) {
    yield put(DeleteCardapioFailure(e.response.data));
  }
}
