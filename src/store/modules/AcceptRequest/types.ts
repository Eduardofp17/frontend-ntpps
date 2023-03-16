export enum AcceptRequestTypes {
  AcceptRequestRequest = 'AcceptRequest/AcceptRequestRequest',
  AcceptRequestSuccess = 'AcceptRequest/AcceptRequestSuccess',
  AcceptRequestFailure = 'AcceptRequest/AcceptRequestFailure',
}

export interface AcceptRequestState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly id: number | null;
}
