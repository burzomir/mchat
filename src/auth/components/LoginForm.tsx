import * as React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { Card, CardBody, Input, Button } from '../../ui'
import { Maybe } from '../../utils/fp/types/Maybe'
import { required, email, compose as composeValidators } from '../../form/validators'

type Values = {
  email: string,
  password: string
}

const LoginFormComponent: React.SFC<InjectedFormProps<Values>> = ({
  handleSubmit
}) => {
  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} noValidate>
          <Field
            name='email'
            type='email'
            label='Email'
            component={Input}
          />
          <Field
            name='password'
            type='password'
            label='Password'
            component={Input}
          />
          <Button block>Sign in</Button>
        </form>
      </CardBody>
    </Card>
  )
}

const validate = ({ email, password }: Values) => {
  const errors: Partial<Values> = {}
  Maybe.of(validateEmail(email)).map(error => errors.email = error)
  Maybe.of(validatePassword(password)).map(error => errors.password = error)
  return errors
}

const validateEmail = composeValidators([required, email])

const validatePassword = composeValidators([required])

export const LoginForm = reduxForm({
  form: 'AuthLoginForm',
  validate
})(LoginFormComponent)
