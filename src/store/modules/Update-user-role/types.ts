export enum UpdateUserRoleTypes {
  UpdateUserRoleRequest = 'UpdateUserRole/UpdateUserRoleRequest',
  UpdateUserRoleSuccess = 'UpdateUserRole/UpdateUserRoleSuccess',
  UpdateUserRoleFailure = 'UpdateUserRole/UpdateUserRoleFailure',
}

export interface UpdateUserRoleState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly id: number | null;
  readonly updating: boolean;
}
