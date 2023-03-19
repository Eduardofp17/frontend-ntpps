export enum RejectRequestTypes {
  RejectRequestRequest = 'RejectRequest/RejectRequestRequest',
  RejectRequestSuccess = 'RejectRequest/RejectRequestSuccess',
  RejectRequestFailure = 'RejectRequest/RejectRequestFailure',
}

export interface RejectRequestState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
  readonly id: number | null;
}
