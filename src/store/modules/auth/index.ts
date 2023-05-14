import { AuthState, PayloadApi } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../../globalTypes';

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
  level: 0,
  school_id: -1,
  creation: 0,
  expiration: 0,
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
    AuthSuccess: (state, action: PayloadAction<Response>) => {
      state.loading = false;
      state.error = false;
      state.token = action.payload.data.token;
      state.level = action.payload.data.level;
      state.school_id = action.payload.data.school_id;
      state.data = { email: '', password: '' };
      state.loggedIn = true;
      state.creation = Number(new Date().getTime());
      state.expiration = Number(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    },
    AuthFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = true;
      state.token = '';
      state.data = { email: '', password: '' };
      state.loggedIn = false;
      state.errorMessage = [action.payload];
      state.creation = 0;
      state.expiration = 0;
    },
    AuthLoggoutRequest: (state) => {
      state.loading = true;
    },
    AuthLoggout: (state) => {
      state.loading = false;
      state.error = false;
      state.token = '';
      state.data = { email: '', password: '' };
      state.loggedIn = false;
      state.level = 0;
      state.school_id = -1;
      state.creation = 0;
      state.expiration = 0;
    },
  },
});

export const {
  AuthRequest,
  AuthSuccess,
  AuthFailure,
  AuthLoggoutRequest,
  AuthLoggout,
} = authSlice.actions;
export default authSlice.reducer;
