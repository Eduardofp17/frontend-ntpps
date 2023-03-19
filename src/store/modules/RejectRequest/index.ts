import { RejectRequestState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: RejectRequestState = {
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
  token: string;
  email: string;
}

const RejectRequestSlice = createSlice({
  name: 'RejectRequest',
  initialState: INITIAL_STATE,
  reducers: {
    RejectRequestRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
    },
    RejectRequestSuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = true;
      state.loading = false;
      state.id = null;
    },
    RejectRequestFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.error;
      state.updated = false;
      state.loading = false;
      state.id = null;
    },
  },
});

export const {
  RejectRequestRequest,
  RejectRequestSuccess,
  RejectRequestFailure,
} = RejectRequestSlice.actions;
export default RejectRequestSlice.reducer;
