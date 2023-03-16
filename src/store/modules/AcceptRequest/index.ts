import { AcceptRequestState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: AcceptRequestState = {
  errorMessage: '',
  error: false,
  updated: false,
  loading: false,
  id: null,
};

interface Error {
  error: string;
}
interface PayloadApi {
  id: number;
  token: string;
  dayname: string;
  breakfast?: string;
  lunch?: string;
  afternoonsnack?: string;
}

const AcceptRequestSlice = createSlice({
  name: 'AcceptRequest',
  initialState: INITIAL_STATE,
  reducers: {
    AcceptRequestRequest: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
    },
    AcceptRequestSuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = true;
      state.loading = false;
      state.id = null;
    },
    AcceptRequestFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.error;
      state.updated = false;
      state.loading = false;
      state.id = null;
    },
  },
});

export const {
  AcceptRequestRequest,
  AcceptRequestSuccess,
  AcceptRequestFailure,
} = AcceptRequestSlice.actions;
export default AcceptRequestSlice.reducer;
