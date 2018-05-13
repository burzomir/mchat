import * as React from 'react'
import { Provider } from 'react-redux'
import { create, history } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Authentication, Paths } from './auth/scenes'
import { Permissions } from './ui/components/Permissions'
import { User } from './auth/permissions'
import { UserProfile } from './auth/containers'

const store = create()

const App: React.SFC = () => (
  <Provider {...{ store }}>
    <ConnectedRouter {...{ history }}>
      <div>
        <Permissions except={[User]}>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/' + Paths.SignIn} />} />
            <Route path='/' component={Authentication} />
          </Switch>
        </Permissions>
        <Permissions only={[User]}>
          <Switch>
            <Route path='/' component={UserProfile} />
          </Switch>
        </Permissions>
      </div>
    </ConnectedRouter>
  </Provider >
)

export default App
