import * as React from 'react'
import { Field, InjectedFormProps } from 'redux-form'
import { Card, CardBody, Input, Button } from '../../ui'

export type SignUnFormValues = {
  email: string,
  password: string,
  confirmPassword: string
}

export const SignUpForm: React.SFC<InjectedFormProps<SignUnFormValues>> = ({
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
          <Field
            name='confirmPassword'
            type='password'
            label='Confirm password'
            component={Input}
          />
          <Button block color='primary'>Sign up</Button>
        </form>
      </CardBody>
    </Card>
  )
}
