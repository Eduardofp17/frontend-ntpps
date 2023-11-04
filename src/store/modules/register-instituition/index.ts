import { RegisterInstituitionState, Payloadpi } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: RegisterInstituitionState = {
  error: false,
  loading: false,
  errorMessage: '',
  registered: false,
};
interface Error {
  msg: string;
}

const RegisterInstituitionSlice = createSlice({
  name: 'RegisterInstituition',
  initialState: INITIAL_STATE,
  reducers: {
    RegisterInstituitionRequest: (state, action: PayloadAction<Payloadpi>) => {
      state.loading = true;
      state.error = false;
      state.registered = false;
      state.errorMessage = '';
    },
    RegisterInstituitionSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.registered = true;
      state.errorMessage = '';
    },
    RegisterInstituitionFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload.msg;
      state.registered = false;
    },
  },
});

export const {
  RegisterInstituitionRequest,
  RegisterInstituitionSuccess,
  RegisterInstituitionFailure,
} = RegisterInstituitionSlice.actions;
export default RegisterInstituitionSlice.reducer;
