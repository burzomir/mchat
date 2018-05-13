import { ThunkAction } from 'redux-thunk'
import { SubmissionError } from 'redux-form'
import * as service from '../service'

export const signIn = (user: { email: string, password: string }): ThunkAction<any, any, any> => {
  return dispatch => {
    return service.signIn(user)
      .catch((error: any) => {
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
