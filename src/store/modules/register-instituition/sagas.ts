import { put, call } from 'redux-saga/effects';
import {
  RegisterInstituitionSuccess,
  RegisterInstituitionFailure,
} from './index';
import axios from '../../../services/axios';
import { Payloadpi } from './types';
import { AxiosError, AxiosResponse } from 'axios';

interface ApiResponse {
  errors?: string[];
  msg?: string;
}

export function* registerInstituitionRequest({
  payload,
}: {
  payload: Payloadpi;
}): Generator {
  try {
    const {
      name,
      email,
      cnpj,
      password,
      address,
      agreeWithTermsAndPrivacyPolicy,
      cep,
      city,
      forms_of_education,
      isPublic,
      neighborhood,
      school_modality,
      state,
    } = payload;

    const response = yield call(axios.post, '/school/', {
      name: name,
      email: email,
      cnpj: cnpj,
      password: password,
      agree_with_terms_and_privacy_policy: agreeWithTermsAndPrivacyPolicy,
      address: address,
      cep: cep,
      city: city,
      forms_of_education: forms_of_education,
      is_public: isPublic,
      neighborhood: neighborhood,
      school_modality: school_modality,
      state: state,
    });
    if ((response as AxiosResponse).status === 200) {
      yield put(RegisterInstituitionSuccess());
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
        yield put(RegisterInstituitionFailure({ msg: String(errorMsg) }));
      } else {
        throw new Error('Internal Server Error');
      }
    } else {
      throw new Error('Internal Server Error');
    }
  }
}
