export enum UpdateCardapioTypes {
  UpdateCardapioRequest = 'UpdateCardapio/UpdateCardapioRequest',
  UpdateCardapioSuccess = 'UpdateCardapio/UpdateCardapioSuccess',
  UpdateCardapioFailure = 'UpdateCardapio/UpdateCardapioFailure',
}

export interface UpdateCardapioState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
}
