import * as React from 'react'
import { Field, InjectedFormProps } from 'redux-form'
import { Card, CardBody, Input, Button } from '../../ui'

export type UsernameFormValues = {
  name: string
}

export const UsernameForm: React.SFC<InjectedFormProps<UsernameFormValues>> = ({
  handleSubmit
}) => {
  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} noValidate>
          <Field
            name='name'
            type='text'
            label='Pick your username'
            component={Input}
          />
          <Button block color='primary'>Save</Button>
        </form>
      </CardBody>
    </Card>
  )
}
