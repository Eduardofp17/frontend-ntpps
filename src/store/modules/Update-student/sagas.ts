import { put, call } from 'redux-saga/effects';
import {
  PayloadApi,
  UpdateStudentFailure,
  UpdateStudentSuccess,
} from './index';
import axios from '../../../services/axios';
import { AxiosResponse, AxiosError } from 'axios';

export function* UpdateStudentRequest({
  payload,
}: {
  payload: PayloadApi;
}): Generator {
  try {
    const { id, name } = payload;

    const response = yield call(axios.put, `/student/${id}`, { name });

    if ((response as AxiosResponse).status === 204) {
      yield put(UpdateStudentSuccess());
    } else {
      throw new Error('Internal Server Error');
    }
    return;
  } catch (e) {
    const responseData = (e as AxiosError)?.response?.data;
    if (responseData instanceof Object && 'msg' in responseData) {
      yield put(UpdateStudentFailure({ error: String(responseData.msg) }));
    } else {
      throw new Error('Internal Server Error');
    }
  }
}
