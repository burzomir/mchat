import * as React from 'react'
import styled from 'styled-components'

export type InputProps = {
  label: string
  value: string
  info?: string
  valid?: boolean
  onChange?: (value: string) => void
}

class Input extends React.Component<InputProps> {

  constructor (props: InputProps) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  render () {

    const {
      label,
      value,
      valid = true,
      info = ''
    } = this.props

    return (
      <div>
        <Label {...{ valid }}>{label}</Label>
        <StyledInput type='text' value={value} onChange={this.onChange} />
        <Info {...{ valid }}>{info}</Info>
      </div>
    )
  }

  onChange (event: React.ChangeEvent<HTMLInputElement>) {

    const { onChange } = this.props

    if (typeof onChange === 'function') {
      onChange(event.currentTarget.value || '')
    }
  }

}

export default Input

const Label = styled.label`
  color: ${(props: { valid: boolean }) => props.valid ? 'black' : 'red'};
  display: block;
  font-size: 0.8rem;
  line-height: 1rem;
  `

const StyledInput = styled.input`
  border: none;
  display: block;
  width: 100%;
  padding: 0;
  line-height: 1.2rem;
  `

const Info = styled.span`
  color: ${(props: { valid: boolean }) => props.valid ? 'gray' : 'red'};
  display: block;
  font-size: 0.6rem;
  height: 1rem;
  line-height: 1rem;
`
