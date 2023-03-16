import { put, call } from 'redux-saga/effects';
import { AcceptRequestSuccess, AcceptRequestFailure } from './index';
import axios from '../../../services/axios';

export function* AcceptRequestRequest({ payload }) {
  try {
    // axios.defaults.headers.Authorization = `Bearer ${payload.token}`;
    console.log('Trying to accept the request');
    // yield put(AcceptRequestSuccess(response));

    return;
  } catch (e) {
    yield put(AcceptRequestFailure(e.response.data));
    console.log('Error');
  }
}
