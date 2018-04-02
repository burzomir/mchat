import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

const Hello = (props: { name: string, onSayHello: VoidFunction }) => {
  return (
    <div>
      <h1>{`Hello ${props.name}`}</h1>
      <button onClick={props.onSayHello}>Say hello</button>
    </div>
  )
}

const stories = storiesOf('Hello', module)
stories.addDecorator(withKnobs)

stories
  .add('Button', () => (
    <Hello name={text('Name', 'World')} onSayHello={action('Say hello clicked')} />
  ))
