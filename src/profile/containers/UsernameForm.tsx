import * as React from 'react'
import { reduxForm } from 'redux-form'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, email, compose as composeValidators } from '../../form/validators'
import { UsernameFormValues, UsernameForm as UsernameFormComponent } from '../components'
import { connect } from 'react-redux'

const validate = ({ username }: UsernameFormValues) => {
  const errors: Partial<UsernameFormValues> = {}
  Maybe.of(validateUsername(username)).map(error => errors.username = error)
  return errors
}

const validateUsername = composeValidators([required, email])

const Form = reduxForm({
  form: 'ProfileUsernameForm',
  validate
})(UsernameFormComponent)

const FormWrapper: React.SFC<{ onSubmit: (values: UsernameFormValues) => any }> = ({ onSubmit }) => <Form {...{ onSubmit }} />

export const UsernameForm = connect(undefined, { onSubmit: console.log })(FormWrapper)
