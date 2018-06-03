import * as React from 'react'
import { Card, CardHeader } from '../../ui'
import { Link, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownItemProps } from 'reactstrap'
import { signOut } from '../../profile/actions'
import { connect, Dispatch } from 'react-redux'
// import { push } from 'react-router-redux'
// import { ConversationList as ConversationListContainer } from '../../conversations/containers/ConversationList'
import { EntryTransition } from '../../ui/components/EntryTransition'
// import { Conversation as TConversation } from '../../conversations/types'
import { RoomList } from '../room-list/room-list'
import { Room } from '../../rooms/room/room'

export const DashboardComponent: React.SFC<{ dispatch: Dispatch<any> }> = ({ dispatch }) => {
  return (
    <>
      <Card className='w-25'>
        <CardHeader className='d-flex justify-content-between align-items-center bg-primary text-white'>
          <Link to='/' className='btn btn-primary'>mchat</Link>
          <UncontrolledButtonDropdown>
            <DropdownToggle color='primary'>Options</DropdownToggle>
            <DropdownMenu right>
              <SignOut />
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </CardHeader>
        <RoomList
          roomUrl='/conversation/'
          rooms={[
            {
              id: '1',
              members: [
                {
                  id: '1',
                  name: 'Michał Kłobukowski'
                },
                {
                  id: '2',
                  name: 'Mateusz Ollik'
                },
                {
                  id: '3',
                  name: 'Mateusz Ollik'
                }
              ]
            }
          ]} />
      </Card>
      <Card className='w-75 border-left-0' style={{ overflow: 'hidden' }}>
        <Switch>
          <Route exact path='/' render={renderWelcomeScreen} />
          <Route exact path='/conversation/:id' render={renderConversation} />
          <Route path='/' render={() => <Redirect to={'/'} />} />
        </Switch>
      </Card>
    </>
  )
}

export const Dashboard = connect((state, props: RouteComponentProps<void>) => props, (dispatch) => ({ dispatch }))(DashboardComponent)

// const ConversationList = connect(null, { onSelect: ({ id }: TConversation) => push(`/conversation/${id}`) })(ConversationListContainer)

const SignOut = connect(null, { onClick: signOut })(({ onClick }: DropdownItemProps) => <DropdownItem {...{ onClick }}>Sign out</DropdownItem>)

const renderWelcomeScreen = () => (
  <EntryTransition>
    <h1 className='text-center'>Welcome to mchat</h1>
  </EntryTransition>
)

const renderConversation = (props: RouteComponentProps<{ id: string }>) => (
  <EntryTransition key={props.match.params.id}>
    <Room id={props.match.params.id}/>
  </EntryTransition>
)
