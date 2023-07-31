import { UpdateUserProfileState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: UpdateUserProfileState = {
  errorMessage: '',
  error: false,
  updated: false,
  loading: false,
  id: null,
  updating: false,
};

interface Error {
  error: string;
}
interface PayloadApi {
  token: string;
  email: string;
}

const AcceptRequestSlice = createSlice({
  name: 'AcceptRequest',
  initialState: INITIAL_STATE,
  reducers: {
    AcceptRequestRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
      state.updating = true;
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
