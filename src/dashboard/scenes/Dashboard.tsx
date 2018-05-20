import * as React from 'react'
import { Card, CardHeader } from '../../ui'
import { Link, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { signOut } from '../../profile/actions'
import { connect, Dispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { ConversationList } from '../../conversations/containers/ConversationList'
import { Conversation } from '../../conversations/containers/Conversation'
import { EntryTransition } from '../../ui/components/EntryTransition'

export const DashboardComponent: React.SFC<{ dispatch: Dispatch<any> }> = ({ dispatch }) => {
  return (
    <>
      <Card className='w-25'>
        <CardHeader className='d-flex justify-content-between align-items-center bg-primary text-white'>
          <Link to='/' className='btn btn-primary'>mchat</Link>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='primary'>Options</DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => dispatch(signOut())}>Sign out</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <ConversationList onSelect={({ id }) => dispatch(push(`/conversation/${id}`))} />
      </Card>
      <Card className='w-75 border-left-0' style={{ overflow: 'hidden' }}>
        <Switch>
          <Route exact path='/' render={() => (
            <EntryTransition>
              <h1 className='text-center'>Welcome to mchat</h1>
            </EntryTransition>
          )} />
          <Route exact path='/conversation/:id' render={(props) => (
            <EntryTransition key={props.match.params.id}>
              <Conversation {...props} />
            </EntryTransition>
          )} />
          <Route path='/' render={() => <Redirect to={'/'} />} />
        </Switch>
      </Card>
    </>
  )
}

export const Dashboard = connect((state, props: RouteComponentProps<void>) => props, (dispatch) => ({ dispatch }))(DashboardComponent)
