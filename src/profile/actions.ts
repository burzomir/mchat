import { createActions } from '../utils/fetch'
import { UserProfile } from './types'
import { ThunkAction } from 'redux-thunk'
import * as auth from '../auth/actions'

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
