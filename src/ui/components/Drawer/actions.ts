import { ActionType, Action } from './types'

export const open = (drawerName: string): Action => ({
  type: ActionType.Open,
  drawerName
})

export const close = (drawerName: string): Action => ({
  type: ActionType.Close,
  drawerName
})
