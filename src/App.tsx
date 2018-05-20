import * as React from 'react'
import { Provider } from 'react-redux'
import { create, history } from './store'
import { ConnectedRouter, push } from 'react-router-redux'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import { Authentication, Paths } from './auth/scenes'
import { Permissions } from './ui/components/Permissions'
import { AuthenticatedUser } from './auth/permissions'
// import { MyProfile } from './profile/scenes'
import { UsersService } from './users'
import { restoreUser } from './auth'
import styled, { keyframes } from 'styled-components'
import { Card, CardHeader } from './ui'
import { ConversationList } from './conversations/components/ConversationList'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { signOut } from './profile/actions'

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
            <Card className='w-25'>
              <CardHeader className='d-flex justify-content-between align-items-center bg-primary text-white'>
                <Link to='/' className='btn btn-primary'>mchat</Link>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color='primary'>Options</DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => store.dispatch(signOut())}>Sign out</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </CardHeader>
              <ConversationList
                onSelect={(conversation) => store.dispatch(push(`/conversation/${conversation.id}`))}
                conversations={[
                  {
                    id: '1',
                    members: [
                      { name: 'Michał Kłobukowski' },
                      { name: 'Mateusz Ollik' }]
                  },
                  {
                    id: '2',
                    members: [
                      { name: 'Mateusz Ollik' }
                    ]
                  }
                ]}
              />
            </Card>
            <Card className='w-75 border-left-0' style={{ overflow: 'hidden' }}>
              <Switch>
                <Route exact path='/' render={() => (
                  <AppContainer className='h-100'>
                    <h1 className='text-center'>Welcome to mchat</h1>
                  </AppContainer>
                )} />
                <Route exact path='/conversation/:id' render={({ match }) => (
                  <AppContainer className='h-100' key={match.params.id}>
                    <h1 className='text-center'>Conversation {match.params.id}</h1>
                  </AppContainer>
                )} />
                <Route path='/' render={() => <Redirect to={'/'} />} />
              </Switch>
            </Card>
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
