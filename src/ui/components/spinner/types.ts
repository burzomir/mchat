import { Map } from 'immutable'

export type InnerState = Map<string, boolean>

export type State = {
  spinner: InnerState
}

export enum ActionType {
  StartLoading = 'spinner/START_LOADING',
  StopLoading = 'spinner/STOP_LOADING'
}

export type Action = {
  type: ActionType
  spinnerName: string
}
