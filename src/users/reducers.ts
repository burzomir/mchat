import { Map } from 'immutable'
import { Action } from 'redux'
import { Action as UsersAction, StateInner, ActionType } from './types'

export const reducer = (state: StateInner = Map(), action: UsersAction | Action) => {
  if ('user' in action) {
    switch (action.type) {
      case ActionType.AddUser:
      case ActionType.UpdateUser:
        return state.set(action.user.id, action.user)

      case ActionType.RemoveUser:
        return state.delete(action.user.id)

      default:
        return state
    }
  }
  return state
}
