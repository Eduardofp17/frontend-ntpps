export enum UpdateFrequencyTypes {
  UpdateFrequencyRequest = 'UpdateFrequency/UpdateFrequencyRequest',
  UpdateFrequencySuccess = 'UpdateFrequency/UpdateFrequencySuccess',
  UpdateFrequencyFailure = 'UpdateFrequency/UpdateFrequencyFailure',
}

export interface UpdateFrequencyState {
  readonly errorMessage: string;
  readonly error: boolean;
  readonly updated: boolean;
  readonly loading: boolean;
}
