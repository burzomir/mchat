import { createActions } from '../utils/fetch'
import { UserProfile } from './types'
import { ThunkAction } from 'redux-thunk'
import * as auth from '../auth/actions'
import { User } from '../users/types'
import { UsersService } from '../users'
import { myId } from './selectors'

const actions = createActions<UserProfile, string>('UserProfile')

export const {
  receiveData: setUserProfile,
  resetData: resetUserProfile
} = actions

export const signOut = (): ThunkAction<any, any, any> => {
  return dispatch => {
    dispatch(resetUserProfile())
    dispatch(auth.signOut())
  }
}

export const updateProfile = (user: Partial<User>): ThunkAction<any, any, any> => {
  return (dispatch, getState) => {
    myId(getState())
      .map(id => ({ id, ...user }))
      .map(profile => UsersService.update(profile))
  }
}
