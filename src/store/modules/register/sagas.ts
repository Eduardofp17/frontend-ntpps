import { put, call } from 'redux-saga/effects';
import { RegisterSuccess, RegisterFailure } from './index';
import axios from '../../../services/axios';
import { get } from 'lodash';

export function* registerRequest({ payload }) {
  try {
    const response: string = yield call(axios.get, '/');
    console.log(response);
    yield put(RegisterSuccess(response));
  } catch (e) {
    console.log(e);
    yield put(RegisterFailure(e));
  }
}
