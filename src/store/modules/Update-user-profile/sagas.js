import { put, call } from 'redux-saga/effects';
import { AcceptRequestSuccess, AcceptRequestFailure } from './index';
import axios from '../../../services/axios';

export function* AcceptRequestRequest({ payload }) {
  try {
    const { email, token } = payload;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const response = yield call(axios.post, '/requests/accept/', {
      email,
    });
    yield put(AcceptRequestSuccess(response));

    return;
  } catch (e) {
    yield put(AcceptRequestFailure(e.response.data));
    console.log('Error');
  }
}
