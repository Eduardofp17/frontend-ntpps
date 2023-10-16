import { UpdateStudentState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: UpdateStudentState = {
  errorMessage: '',
  error: false,
  updated: false,
  loading: false,
  id: -1,
};

interface Error {
  error: string;
}

export interface PayloadApi {
  id: number;
  name: string;
}

const UpdateStudentSlice = createSlice({
  name: 'UpdateStudent',
  initialState: INITIAL_STATE,
  reducers: {
    UpdateStudentRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
      state.id = action.payload.id;
    },
    UpdateStudentSuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = true;
      state.loading = false;
      state.id = -1;
    },
    UpdateStudentFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.id = -1;
      state.updated = false;
      state.errorMessage = action.payload.error;
    },
  },
});

export const {
  UpdateStudentRequest,
  UpdateStudentSuccess,
  UpdateStudentFailure,
} = UpdateStudentSlice.actions;
export default UpdateStudentSlice.reducer;
