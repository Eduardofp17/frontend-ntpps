import { put, call } from 'redux-saga/effects';
import { RejectRequestSuccess, RejectRequestFailure } from './index';
import axios from '../../../services/axios';

export function* RejectRequestRequest({ payload }) {
  try {
    const { email, token } = payload;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const response = yield call(axios.post, '/requests/accept/', {
      email,
    });
    yield put(RejectRequestSuccess(response));

    return;
  } catch (e) {
    yield put(RejectRequestFailure(e.response.data));
    console.log('Error');
  }
}
