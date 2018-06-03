import * as React from 'react'
import { Card, CardHeader } from '../../ui'
import { Link, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownItemProps } from 'reactstrap'
import { signOut } from '../../profile/actions'
import { connect, Dispatch } from 'react-redux'
import { EntryTransition } from '../../ui/components/EntryTransition'
import { RoomList as RoomListComponent } from '../room-list/room-list'
import { Room } from '../../rooms/room/room'
import { RoomsService } from '../../rooms/rooms.service'
import { RoomForm } from '../../rooms/room-form/room-form'

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
        <RoomList />
      </Card>
      <Card className='w-75 border-left-0 p-5' style={{ overflow: 'hidden' }}>
        <Switch>
          <Route exact path='/' render={renderWelcomeScreen} />
          <Route exact path='/conversation/new' render={renderRoomForm} />
          <Route exact path='/conversation/:id' render={renderConversation} />
          <Route path='/' render={() => <Redirect to={'/'} />} />
        </Switch>
      </Card>
    </>
  )
}

class RoomList extends React.Component {

  state: { rooms: string[] } = {
    rooms: []
  }

  roomsService: RoomsService

  render () {
    return (
      <div>
        <Link className='btn btn-default btn-block' to='/conversation/new'>Create room</Link>
        <RoomListComponent roomUrl='/conversation/' rooms={this.state.rooms} />
      </div>
    )
  }

  componentDidMount () {
    this.roomsService = RoomsService.getForUser('bA1AgO6Sckaq7bSPvzHgXd4PDH52')
    this.roomsService.rooms.subscribe(rooms => this.setState({ rooms }))
  }
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
    <Room id={props.match.params.id} />
  </EntryTransition>
)

const renderRoomForm = () => (
  <EntryTransition key='room-form'>
    <RoomForm />
  </EntryTransition>
)
