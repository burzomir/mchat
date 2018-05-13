import * as React from 'react'
import { reduxForm } from 'redux-form'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, email, compose as composeValidators, minLength } from '../../form/validators'
import { SignUnFormValues, SignUpForm as SignUnFormComponent } from '../components'
import { signUp } from '../actions'
import { connect } from 'react-redux'

const validate = ({ email, password, confirmPassword }: SignUnFormValues) => {
  const errors: Partial<SignUnFormValues> = {}
  Maybe.of(validateEmail(email)).map(error => errors.email = error)
  Maybe.of(validatePassword(password)).map(error => errors.password = error)
  Maybe.of(validatePasswordConfirmation(password, confirmPassword)).map(error => errors.confirmPassword = error)
  return errors
}

const validateEmail = composeValidators([required, email])

const validatePassword = composeValidators([required, minLength(6)])

const validatePasswordConfirmation = (password: string, confirmPassword: string) => {
  const match = () => password === confirmPassword ? undefined : 'Passwords do not match'
  return composeValidators([required, match])(confirmPassword)
}

const Form = reduxForm({
  form: 'AuthSignUpForm',
  validate
})(SignUnFormComponent)

const FormWrapper: React.SFC<{ onSubmit: (values: SignUnFormValues) => any }> = ({ onSubmit }) => <Form {...{ onSubmit }} />

export const SignUpForm = connect(undefined, { onSubmit: signUp })(FormWrapper)
