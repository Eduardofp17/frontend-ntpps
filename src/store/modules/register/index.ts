import { RegisterState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const INITIAL_STATE: RegisterState = {
  token: '',
  error: false,
  loading: false,
  errorMessage: [],

  loggedIn: false,
};
const registerSlice = createSlice({
  name: 'register',
  initialState: INITIAL_STATE,
  reducers: {
    RegisterRequest: (state) => {
      state.loading = true;
    },
    RegisterSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = false;
      state.token = action.payload.data.token;
      state.loggedIn = true;
    },
    RegisterFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.token = '';
      state.loggedIn = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { RegisterRequest, RegisterSuccess, RegisterFailure } =
  registerSlice.actions;
export default registerSlice.reducer;
