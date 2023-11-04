import { RegisterUserState, Payloadpi } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: RegisterUserState = {
  error: false,
  loading: false,
  errorMessage: '',
  registered: false,
};
interface Error {
  msg: string;
}

const RegisterUserSlice = createSlice({
  name: 'RegisterUser',
  initialState: INITIAL_STATE,
  reducers: {
    RegisterUserRequest: (state, action: PayloadAction<Payloadpi>) => {
      state.loading = true;
      state.error = false;
      state.registered = false;
      state.errorMessage = '';
    },
    RegisterUserSuccess: (state) => {
      state.loading = false;
      state.error = false;
      state.registered = true;
      state.errorMessage = '';
    },
    RegisterUserFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = action.payload.msg;
      state.registered = false;
    },
  },
});

export const { RegisterUserRequest, RegisterUserSuccess, RegisterUserFailure } =
  RegisterUserSlice.actions;
export default RegisterUserSlice.reducer;
