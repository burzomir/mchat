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
import firebase from '../../third-party/firebase'
import { User } from '../../users/user'
import { Subscription } from 'rxjs'
import { CurrentUserService } from '../../users/user.service'
import { pathOr } from 'ramda'

export const DashboardComponent: React.SFC<{ dispatch: Dispatch<any> }> = ({ dispatch }) => {
  return (
    <>
      <Card className='w-25'>
        <CardHeader className='d-flex justify-content-between align-items-center bg-primary text-white'>
          <div style={{ width: '33%' }}>
            <UncontrolledButtonDropdown>
              <DropdownToggle color='primary'>...</DropdownToggle>
              <DropdownMenu right>
                <Link to='/profile' className='dropdown-item'>Profile</Link>
                <SignOut />
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
          <div style={{ width: '33%' }} className='text-center'>
            <Link to='/' className='btn btn-primary'>mchat</Link>
          </div>
          <div style={{ width: '33%' }} className='text-right'>
            <Link className='btn btn-primary' to='/conversation/new'>+</Link>
          </div>
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
        <RoomListComponent roomUrl='/conversation/' rooms={this.state.rooms} />
      </div>
    )
  }

  componentDidMount () {
    const user = firebase.auth().currentUser
    if (user) {
      this.roomsService = RoomsService.getForUser(user.uid)
      this.roomsService.rooms.subscribe(rooms => this.setState({ rooms }))
    }
  }

}

export const Dashboard = connect((state, props: RouteComponentProps<void>) => props, (dispatch) => ({ dispatch }))(DashboardComponent)

const SignOut = connect(null, { onClick: signOut })(({ onClick }: DropdownItemProps) => <DropdownItem {...{ onClick }}>Sign out</DropdownItem>)

const renderWelcomeScreen = () => <WelcomeScreen />

class WelcomeScreen extends React.Component<any, { user: User | null }> {

  state: { user: User | null } = {
    user: null
  }

  subscription: Subscription

  componentDidMount () {
    this.subscription = CurrentUserService.getInstance().currentUser.subscribe(user => this.setState({ user }))
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  render () {
    return (
      <EntryTransition>
        <h1 className='text-center'>Welcome to mchat, {pathOr('unnamed', ['user', 'name'])(this.state)}!</h1>
      </EntryTransition>
    )
  }

}

const renderConversation = (props: RouteComponentProps<{ id: string }>) => (
  <EntryTransition key={props.match.params.id} className='h-100'>
    <Room id={props.match.params.id} />
  </EntryTransition>
)

const renderRoomForm = () => (
  <EntryTransition key='room-form'>
    <RoomForm />
  </EntryTransition>
)
