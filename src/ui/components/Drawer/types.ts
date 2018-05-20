import { Map } from 'immutable'

export type InnerState = Map<string, boolean>

export type State = {
  drawer: InnerState
}

export enum ActionType {
  Open = 'drawer/OPEN',
  Close = 'drawer/CLOSE'
}

export type Action = {
  type: ActionType
  drawerName: string
}
