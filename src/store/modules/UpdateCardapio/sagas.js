import { put, call } from 'redux-saga/effects';
import { UpdateCardapioSuccess, UpdateCardapioFailure } from './index';
import axios from '../../../services/axios';

export function* updateCardapioRequest({ payload }) {
  try {
    axios.defaults.headers.Authorization = `Bearer ${payload.token}`;
    const response = yield call(axios.put, `/cardapio/${payload.id}`, {
      breakfast: payload.breakfast,
      lunch: payload.lunch,
      afternoonsnack: payload.afternoonsnack,
    });
    yield put(UpdateCardapioSuccess(response));

    return;
  } catch (e) {
    yield put(UpdateCardapioFailure(e.response.data));
  }
}
