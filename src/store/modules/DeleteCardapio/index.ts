import { DeleteCardapioState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: DeleteCardapioState = {
  errorMessage: [],
  error: false,
  deleted: false,
  loading: false,
};

interface Error {
  errors: string[];
}
interface PayloadApi {
  id: number;
  token: string;
}
const deleteCardapioSlice = createSlice({
  name: 'DeleteCardapio',
  initialState: INITIAL_STATE,
  reducers: {
    DeleteCardapioRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = [];
      state.deleted = false;
      state.loading = true;
    },
    DeleteCardapioSuccess: (state) => {
      state.error = false;
      state.errorMessage = [];
      state.deleted = true;
      state.loading = false;
    },
    DeleteCardapioFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.errors;
      state.deleted = false;
      state.loading = false;
    },
  },
});

export const {
  DeleteCardapioRequest,
  DeleteCardapioSuccess,
  DeleteCardapioFailure,
} = deleteCardapioSlice.actions;
export default deleteCardapioSlice.reducer;
