import * as React from 'react'
import { WrappedFieldProps } from 'redux-form'
import { FormGroup, FormFeedback, Label, Input as InputElement } from 'reactstrap'
import { InputType } from 'reactstrap/lib/Input'

export const Input: React.SFC<WrappedFieldProps & { type: string }> = ({
  label,
  type: typeProp,
  input: {
    name,
    onChange,
    onBlur,
    value
  },
  meta: {
    touched,
    error
  }
}) => {
  const type = typeProp as InputType

  return (
    <FormGroup >
      <Label>{label}</Label>
      <InputElement
        {...{ value, type, onChange, onBlur, invalid: Boolean(touched && error) }}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  )
}
