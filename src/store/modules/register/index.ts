import { RegisterState, RegisterPayload } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const INITIAL_STATE: RegisterState = {
  token: '',
  error: false,
  loading: false,
  errorMessage: { created: false, msg: '' },
  registered: false,
  loggedIn: false,
};
const registerSlice = createSlice({
  name: 'register',
  initialState: INITIAL_STATE,
  reducers: {
    RegisterRequest: (state, action: PayloadAction<RegisterPayload>) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = false;
      state.token = action.payload.data.token;
      state.loggedIn = true;
      state.registered = true;
    },
    RegisterFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.token = '';
      state.loggedIn = false;
      state.errorMessage = action.payload;
      state.registered = false;
    },
  },
});

export const { RegisterRequest, RegisterSuccess, RegisterFailure } =
  registerSlice.actions;
export default registerSlice.reducer;
