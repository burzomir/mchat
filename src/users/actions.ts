import { User, Action, ActionType } from './types'

export const addUser = (user: User): Action => ({
  type: ActionType.AddUser,
  user
})

export const updateUser = (user: User): Action => ({
  type: ActionType.UpdateUser,
  user
})

export const removeUser = (user: User): Action => ({
  type: ActionType.RemoveUser,
  user
})
