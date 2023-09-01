import { DeleteUserState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: DeleteUserState = {
  errorMessage: '',
  error: false,
  deleted: false,
  loading: false,
  id: null,
};

interface Error {
  error: string;
}
interface PayloadApi {
  token: string;
  id: number;
}

const DeleteUserSlice = createSlice({
  name: 'DeleteUser',
  initialState: INITIAL_STATE,
  reducers: {
    DeleteUserRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.deleted = false;
      state.loading = true;
    },
    DeleteUserSuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.deleted = true;
      state.loading = false;
      state.id = null;
    },
    DeleteUserFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.error;
      state.deleted = false;
      state.loading = false;
      state.id = null;
    },
  },
});

export const { DeleteUserRequest, DeleteUserSuccess, DeleteUserFailure } =
  DeleteUserSlice.actions;
export default DeleteUserSlice.reducer;
