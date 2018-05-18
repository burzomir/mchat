import { Action } from 'redux'
import { Map } from 'immutable'
import { InnerState, Action as SpinnerAction, ActionType } from './types'

export const reducer = (state: InnerState = Map(), action: Action | SpinnerAction) => {
  if ('spinnerName' in action) {
    switch (action.type) {
      case ActionType.StartLoading:
        return state.set(action.spinnerName, true)
      case ActionType.StopLoading:
        return state.set(action.spinnerName, false)
    }
  }
  return state
}
