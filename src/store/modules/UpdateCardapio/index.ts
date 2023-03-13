import { UpdateCardapioState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: UpdateCardapioState = {
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
const updateCardapioSlice = createSlice({
  name: 'UpdateCardapio',
  initialState: INITIAL_STATE,
  reducers: {
    UpdateCardapioRequest: (state, action: PayloadAction<PayloadApi>) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = false;
      state.loading = true;
      state.id = action.payload.id;
    },
    UpdateCardapioSuccess: (state) => {
      state.error = false;
      state.errorMessage = '';
      state.updated = true;
      state.loading = false;
      state.id = null;
    },
    UpdateCardapioFailure: (state, action: PayloadAction<Error>) => {
      state.error = true;
      state.errorMessage = action.payload.error;
      state.updated = false;
      state.loading = false;
      state.id = null;
    },
  },
});

export const {
  UpdateCardapioRequest,
  UpdateCardapioSuccess,
  UpdateCardapioFailure,
} = updateCardapioSlice.actions;
export default updateCardapioSlice.reducer;
