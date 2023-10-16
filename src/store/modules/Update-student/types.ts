export enum UpdateStudentTypes {
  UpdateStudentRequest = 'UpdateStudent/UpdateStudentRequest',
  UpdateStudentSuccess = 'UpdateStudent/UpdateStudentSuccess',
  UpdateStudentFailure = 'UpdateStudent/UpdateStudentFailure',
}

export interface UpdateStudentState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly id: number;
}
