import { put, call } from 'redux-saga/effects';
import { UpdateUserRoleFailure, UpdateUserRoleSuccess } from './index';
import axios from '../../../services/axios';

export function* UpdateUserRoleRequest({ payload }) {
  try {
    const { id, role, token } = payload;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const response = yield call(axios.put, `/users/update-user-role/${id}`, {
      level: Number(role),
    });
    yield put(UpdateUserRoleSuccess(response));

    return;
  } catch (e) {
    yield put(UpdateUserRoleFailure(e.response.data));
    console.log('INTERNAL SERVER ERROR');
  }
}
