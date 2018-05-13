import * as React from 'react'
import { Field, InjectedFormProps } from 'redux-form'
import { Card, CardBody, Input, Button } from '../../ui'

export type SignInFormValues = {
  email: string,
  password: string
}

export const SignInForm: React.SFC<InjectedFormProps<SignInFormValues>> = ({
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
          <Button block color='primary'>Sign in</Button>
        </form>
      </CardBody>
    </Card>
  )
}
