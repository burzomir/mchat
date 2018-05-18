import { Map } from 'immutable'

export type InnerState = Map<string, boolean>

export type State = {
  spinner: InnerState
}

export enum ActionType {
  StartLoading = 'START_LOADING',
  StopLoading = 'STOP_LOADING'
}

export type Action = {
  type: ActionType
  spinnerName: string
}
