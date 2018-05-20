import { Action } from 'redux'
import { Map } from 'immutable'
import { InnerState, Action as DrawerAction, ActionType } from './types'

export const reducer = (state: InnerState = Map(), action: Action | DrawerAction) => {
  if ('drawerName' in action) {
    switch (action.type) {
      case ActionType.Open:
        return state.set(action.drawerName, true)
      case ActionType.Close:
        return state.set(action.drawerName, false)
    }
  }
  return state
}
