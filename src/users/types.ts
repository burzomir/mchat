import { Map } from 'immutable'

export type User = {
  id: string,
  username: string,
  status: 'offline' | 'online'
}

export type UsersStateInner = Map<string, User>

export type UsersState = {
  users: UsersState
}
