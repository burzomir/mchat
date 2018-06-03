import { Map } from 'immutable'

export type User = {
  id: string,
  name?: string,
  status?: 'offline' | 'online'
}

export type StateInner = Map<string, User>

export type State = {
  users: StateInner
}

export type Action = {
  type: ActionType,
  user: User
}

export enum ActionType {
  AddUser = 'ADD_USER',
  UpdateUser = 'UPDATE_USER',
  RemoveUser = 'REMOVE_USER'
}
