export enum DeleteCardapioTypes {
  DeleteCardapioRequest = 'DeleteCardapio/DeleteCardapioRequest',
  DeleteCardapioSuccess = 'DeleteCardapio/DeleteCardapioSuccess',
  DeleteCardapioFailure = 'DeleteCardapio/DeleteCardapioFailure',
}

export interface DeleteCardapioState {
  readonly errorMessage: string[];
  readonly error: boolean;
  readonly deleted: boolean;
  readonly loading: boolean;
}
