import { UpdateUserRoleState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: UpdateUserRoleState = {
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
  id: number;
  role: number;
}

const UpdateUserRoleSlice = createSlice({
  name: 'UpdateUserRole',
  initialState: INITIAL_STATE,
  reducers: {
    UpdateUserRoleRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
      state.updating = true;
    },
    UpdateUserRoleSuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = true;
      state.loading = false;
      state.id = null;
    },
    UpdateUserRoleFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.error;
      state.updated = false;
      state.loading = false;
      state.id = null;
    },
  },
});

export const {
  UpdateUserRoleRequest,
  UpdateUserRoleSuccess,
  UpdateUserRoleFailure,
} = UpdateUserRoleSlice.actions;
export default UpdateUserRoleSlice.reducer;
