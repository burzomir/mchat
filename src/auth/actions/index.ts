import { ThunkAction } from 'redux-thunk'
import { SubmissionError } from 'redux-form'
import * as service from '../service'

export const signIn = (user: { email: string, password: string }): ThunkAction<any, any, any> => {
  return dispatch => {
    console.log(user)
    throw new SubmissionError({ email: 'Invalid email' })
  }
}

export const signUp = (user: { email: string, password: string }): ThunkAction<any, any, any> => {
  return dispatch => {
    service.signUp(user)
  }
}
