import * as React from 'react'
import { Provider } from 'react-redux'
import { create, history } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Authentication, Paths } from './auth/scenes'

const store = create()

const App: React.SFC = () => (
  <Provider {...{ store }}>
    <ConnectedRouter {...{ history }}>
      <Switch>
        <Route exact path='/' render={() => <Redirect to={'/' + Paths.SignIn} />} />
        <Route path='/' component={Authentication}/>
      </Switch>
    </ConnectedRouter>
  </Provider >
)

export default App
