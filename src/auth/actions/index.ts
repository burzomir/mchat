import { ThunkAction } from 'redux-thunk'
import { SubmissionError } from 'redux-form'
import { createActions } from '../../utils/fetch'
import * as service from '../service'
import { User } from '../types'
import { ModuleNames } from '../moduleNames'
import { startLoading, stopLoading } from '../../ui/components/Spinner'

const {
  receiveData: receiveUser,
  resetData: resetUser
} = createActions<User, string>(ModuleNames.User)

export const signIn = (user: { email: string, password: string }): ThunkAction<any, any, any> => {
  return dispatch => {
    dispatch(startLoading(ModuleNames.AuthenticationSpinner))
    return service.signIn(user)
      .then(user => {
        dispatch(receiveUser(user))
        dispatch(stopLoading(ModuleNames.AuthenticationSpinner))
      })
      .catch((error: any) => {
        dispatch(stopLoading(ModuleNames.AuthenticationSpinner))
        if (error) {
          throw new SubmissionError(error)
        }
        throw new SubmissionError({ password: 'Could not sign in' })
      })
  }
}

export const signUp = (user: { email: string, password: string }): ThunkAction<any, any, any> => {
  return dispatch => {
    return service.signUp(user)
      .catch((error: any) => {
        if (error) {
          throw new SubmissionError(error)
        }
        throw new SubmissionError({ confirmPassword: 'Could not sign up' })
      })
  }
}

export const signOut = (): ThunkAction<any, any, any> => {
  return dispatch => {
    dispatch(resetUser())
  }
}
