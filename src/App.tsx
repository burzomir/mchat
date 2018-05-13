import * as React from 'react'
import { getOembed } from './oembed'
import { Provider } from 'react-redux'
import createStore from './store'
import * as auth from './auth'
import { LoginForm } from './auth/components'
import { SubmissionError } from 'redux-form'

Object.defineProperty(window, 'myauth', {
  value: auth
})

const store = createStore()

class App extends React.Component<any, { isOpened: boolean }> {
  constructor (props: any) {
    super(props)
    this.state = {
      isOpened: true
    }
  }

  componentDidMount () {
    getOembed('https://soundcloud.com/mamomam-records/05-red-sun-rising-distant')
      .then(console.log)
    // setInterval(() => {
    //   this.setState(({ isOpened }) => ({ isOpened: !isOpened }))
    // }, 2000)
  }

  handleSubmit = () => {
    return new Promise(() => {
      throw new SubmissionError({ email: 'Email taken' })
    })
  }

  render () {
    return (
      <Provider {...{ store }}>
        <div>
          <h1>Test</h1>
          <LoginForm onSubmit={this.handleSubmit} />
        </div>
      </Provider>
    )
  }
}

export default App
