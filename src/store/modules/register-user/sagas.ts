import { put, call } from 'redux-saga/effects';
import { RegisterUserFailure, RegisterUserSuccess } from './index';
import axios from '../../../services/axios';
import { Payloadpi } from './types';
import { AxiosError, AxiosResponse } from 'axios';

interface ApiResponse {
  errors?: string[];
  msg?: string;
}

export function* registerUserRequest({
  payload,
}: {
  payload: Payloadpi;
}): Generator {
  try {
    const {
      name,
      lastname,
      email,
      code,
      password,
      acceptedTermsandPrivacyPolicy,
      birthday,
      isMale,
    } = payload;
    const response = yield call(axios.post, '/requests/', {
      nome: name,
      sobrenome: lastname,
      email,
      code,
      password,
      agree_with_terms_and_privacy_policy: acceptedTermsandPrivacyPolicy,
      birthday,
      is_male: isMale,
    });
    if ((response as AxiosResponse).status === 200) {
      yield put(RegisterUserSuccess());
    } else {
      throw new Error('Internal Server Error');
    }
    return;
  } catch (e) {
    const responseData = (e as AxiosError<ApiResponse>)?.response?.data;

    if (responseData) {
      let errorMsg: string | undefined;

      if (
        responseData.errors &&
        Array.isArray(responseData.errors) &&
        responseData.errors.length > 0
      ) {
        errorMsg = responseData.errors[0];
      } else if (responseData.msg) {
        errorMsg = responseData.msg;
      }

      if (errorMsg) {
        yield put(RegisterUserFailure({ msg: String(errorMsg) }));
      } else {
        throw new Error('Internal Server Error');
      }
    } else {
      throw new Error('Internal Server Error');
    }
  }
}
