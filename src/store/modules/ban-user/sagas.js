import { put, call } from 'redux-saga/effects';
import { DeleteUserSuccess, DeleteUserFailure } from './index';
import axios from '../../../services/axios';

export function* DeleteUserRequest({ payload }) {
  try {
    const { id, token } = payload;
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    const response = yield call(axios.delete, `/users/${id}`);
    yield put(DeleteUserSuccess(response));
    return;
  } catch (e) {
    yield put(DeleteUserFailure(e.response.data));
    console.log('INTERNAL SERVER ERROR');
  }
}
