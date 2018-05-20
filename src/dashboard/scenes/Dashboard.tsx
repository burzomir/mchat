import * as React from 'react'
import { Card, CardHeader } from '../../ui'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { ConversationList } from '../../conversations/components/ConversationList'
import { signOut } from '../../profile/actions'
import { push } from 'react-router-redux'
import { connect, Dispatch } from 'react-redux'

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
        <ConversationList
          onSelect={({ id }) => dispatch(push(`/conversation/${id}`))}
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
            <h1 className='text-center'>Welcome to mchat</h1>
          )} />
          <Route exact path='/conversation/:id' render={({ match }) => (
              <h1 className='text-center'>Conversation {match.params.id}</h1>
          )} />
          <Route path='/' render={() => <Redirect to={'/'} />} />
        </Switch>
      </Card>
    </>
  )
}

export const Dashboard = connect(null, (dispatch) => ({ dispatch }))(DashboardComponent)
