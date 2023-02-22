import { AuthState, PayloadApi } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const INITIAL_STATE: AuthState = {
  token: '',
  error: false,
  loading: false,
  errorMessage: [],
  data: {
    email: '',
    password: '',
  },
  loggedIn: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    AuthRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.loading = true;
      if (action) {
        state.data = action.payload;
      }
    },
    AuthSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = false;
      state.token = action.payload.data.token;
      state.data = { email: '', password: '' };
      state.loggedIn = true;
    },
    AuthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.token = '';
      state.data = { email: '', password: '' };
      state.loggedIn = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { AuthRequest, AuthSuccess, AuthFailure } = authSlice.actions;
export default authSlice.reducer;
