import * as React from 'react'
import { reduxForm } from 'redux-form'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, compose as composeValidators } from '../../form/validators'
import { UsernameFormValues, UsernameForm as UsernameFormComponent } from '../components'
import { connect } from 'react-redux'
import { updateProfile as onSubmit } from '../actions'

const validate = ({ name }: UsernameFormValues) => {
  const errors: Partial<UsernameFormValues> = {}
  Maybe.of(validateUsername(name)).map(error => errors.name = error)
  return errors
}

const validateUsername = composeValidators([required])

const Form = reduxForm({
  form: 'ProfileUsernameForm',
  validate
})(UsernameFormComponent)

const FormWrapper: React.SFC<{ onSubmit: (values: UsernameFormValues) => any }> = ({ onSubmit }) => <Form {...{ onSubmit }} />

export const UsernameForm = connect(undefined, { onSubmit })(FormWrapper)
