import * as React from 'react'
import { Provider } from 'react-redux'
import { create, history } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Authentication, Paths } from './auth/scenes'
import { Permissions } from './ui/components/Permissions'
import { AuthenticatedUser } from './auth/permissions'
// import { MyProfile } from './profile/scenes'
import { UsersService } from './users'
import { restoreUser } from './auth'
import styled, { keyframes } from 'styled-components'
import { Dashboard } from './dashboard/scenes/Dashboard'

const store = create()
restoreUser(store)
UsersService.init(store)

const App: React.SFC = () => (
  <Provider {...{ store }}>
    <ConnectedRouter {...{ history }}>
      <RootContainer>
        <Permissions except={[AuthenticatedUser]}>
          <AppContainer>
            <Switch>
              <Route path='/auth' component={Authentication} />
              <Route path='/' render={() => <Redirect to={'/auth' + Paths.SignIn} />} />
            </Switch>
          </AppContainer>
        </Permissions>
        <Permissions only={[AuthenticatedUser]}>
          <AppContainer className='d-flex h-100'>
            <Dashboard/>
          </AppContainer>
        </Permissions>
      </RootContainer>
    </ConnectedRouter>
  </Provider>
)

export default App

const AppEntryKeyframes = keyframes`
  0% {
        opacity: 0;
      transform: translateY(5%)
    }
  100% {
        opacity: 1;
      transform: translateY(0)
    }
  `

const AppContainer = styled.div`
  animation: 0.5s ${AppEntryKeyframes} cubic-bezier(0.785, 0.135, 0.15, 0.86);
    `

const RootContainer = styled.div`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
    `
