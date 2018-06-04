import * as React from 'react'
import { Provider } from 'react-redux'
import { create, history } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Authentication, Paths } from './auth/scenes'
import { Permissions } from './ui/components/Permissions'
import { AuthenticatedUser } from './auth/permissions'
import { UsersService } from './users'
import { restoreUser } from './auth'
import styled from 'styled-components'
import { Dashboard } from './dashboard/scenes/Dashboard'
import { EntryTransition } from './ui/components/EntryTransition'
import { UserWithProfile } from './profile/permissions'
import { UsernameForm } from './profile/containers'
import { Container, Row, Col } from 'reactstrap'

const store = create()
restoreUser(store)
UsersService.init(store)

const App: React.SFC = () => (
  <Provider {...{ store }}>
    <ConnectedRouter {...{ history }}>
      <RootContainer>
        <Permissions except={[AuthenticatedUser]}>
          <EntryTransition>
            <Switch>
              <Route path='/auth' component={Authentication} />
              <Route path='/' render={() => <Redirect to={'/auth' + Paths.SignIn} />} />
            </Switch>
          </EntryTransition>
        </Permissions>
        <Permissions only={[AuthenticatedUser]} except={[UserWithProfile]}>
          <EntryTransition className='d-flex h-100'>
            <Switch>
              <Route path='/' render={renderUsernameForm} />
            </Switch>
          </EntryTransition>
        </Permissions>
        <Permissions only={[UserWithProfile]}>
          <EntryTransition className='d-flex h-100'>
            <Switch>
              <Route path='/' component={Dashboard} />
            </Switch>
          </EntryTransition>
        </Permissions>
      </RootContainer>
    </ConnectedRouter>
  </Provider>
)

export default App

const RootContainer = styled.div`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
    `

const renderUsernameForm = () => (
  <Container>
    <Row>
      <Col xs={{ size: 12 }} md={{ size: 6, offset: 3 }}>
        <h1 className='text-center my-5'>mchat</h1>
        <UsernameForm />
      </Col>
    </Row>
  </Container>
)
