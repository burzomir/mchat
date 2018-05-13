import * as React from 'react'
import { reduxForm } from 'redux-form'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, email, compose as composeValidators } from '../../form/validators'
import { SignInFormValues, SignInForm as SignInFormComponent } from '../components'
import { connect } from 'react-redux'
import { signIn } from '../actions'

const validate = ({ email, password }: SignInFormValues) => {
  const errors: Partial<SignInFormValues> = {}
  Maybe.of(validateEmail(email)).map(error => errors.email = error)
  Maybe.of(validatePassword(password)).map(error => errors.password = error)
  return errors
}

const validateEmail = composeValidators([required, email])

const validatePassword = composeValidators([required])

const Form = reduxForm({
  form: 'AuthSignInForm',
  validate
})(SignInFormComponent)

const FormWrapper: React.SFC<{ onSubmit: (values: SignInFormValues) => any }> = ({ onSubmit }) => <Form {...{ onSubmit }} />

export const SignInForm = connect(undefined, { onSubmit: signIn })(FormWrapper)
