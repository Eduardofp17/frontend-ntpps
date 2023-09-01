export enum DeleteUserTypes {
  DeleteUserRequest = 'DeleteUser/DeleteUserRequest',
  DeleteUserSuccess = 'DeleteUser/DeleteUserSuccess',
  DeleteUserFailure = 'DeleteUser/DeleteUserFailure',
}

export interface DeleteUserState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly deleted: boolean;
  readonly loading: boolean;
  readonly id: number | null;
}
