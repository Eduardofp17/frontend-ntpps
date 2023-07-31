export enum AcceptRequestTypes {
  UpdateUserProfileRequest = 'UpdateUserProfile/UpdateUserProfileRequest',
  UpdateUserProfileSuccess = 'UpdateUserProfile/UpdateUserProfileSuccess',
  UpdateUserProfileFailure = 'UpdateUserProfile/UpdateUserProfileFailure',
}

export interface UpdateUserProfileState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly id: number | null;
  readonly updating: boolean;
}
