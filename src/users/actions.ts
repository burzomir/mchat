import { User } from './types'

export const addUser = (user: Partial<User>) => ({
  type: 'ADD_USER',
  user
})

export const updateUser = (user: Partial<User>) => ({
  type: 'UPDATE_USER',
  user
})

export const removeUser = (user: Partial<User>) => ({
  type: 'REMOVE_USER',
  user
})
