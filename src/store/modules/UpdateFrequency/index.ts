import { UpdateFrequencyState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Classes } from '../../globalTypes';

const INITIAL_STATE: UpdateFrequencyState = {
  loading: false,
  error: false,
  errorMessage: '',
  updated: false,
};

interface Error {
  error: string;
}
export interface PayloadApi {
  student_id: number;
  body: Classes;
}

const UpdateFrequencySlice = createSlice({
  name: 'UpdateFrequency',
  initialState: INITIAL_STATE,
  reducers: {
    UpdateFrequencyRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
    },
    UpdateFrequencySuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = true;
      state.loading = false;
    },
    UpdateFrequencyFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.error;
      state.updated = false;
      state.loading = false;
    },
  },
});

export const {
  UpdateFrequencyRequest,
  UpdateFrequencySuccess,
  UpdateFrequencyFailure,
} = UpdateFrequencySlice.actions;
export default UpdateFrequencySlice.reducer;
