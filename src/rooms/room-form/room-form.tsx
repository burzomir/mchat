import * as React from 'react'
import { Input, InputGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { Subscription } from 'rxjs'
import { Map } from 'immutable'
import { UsersSearchService } from '../../users/users-search.service'
import { User } from '../../users/user'
import { EntryTransition } from '../../ui/components/EntryTransition'
import { RoomsService } from '../rooms.service'
import { Redirect } from 'react-router'
import { SpinnerContainer } from '../../ui/components/Spinner/SpinnerContainer'
import firebase from '../../third-party/firebase'

interface RoomFormProps { }

interface RoomFormState {
  members: Map<string, User>
  users: User[]
  query: string
  roomId: string
  isLoading: boolean
}

export class RoomForm extends React.Component<RoomFormProps, RoomFormState> {

  state: RoomFormState = {
    members: Map(),
    users: [],
    query: '',
    roomId: '',
    isLoading: false
  }

  usersSearchService = UsersSearchService.create()
  user = firebase.auth().currentUser
  roomsService = RoomsService.getForUser(this.user ? this.user.uid : '')

  subscription: Subscription

  render () {
    return (
      <SpinnerContainer loading={this.state.isLoading}>
        <h1>New room</h1>
        <InputGroup size='lg'>
          <Input placeholder='Start typing to add your friends to new room' type='text' value={this.state.query} onChange={this.handleQueryChange} />
        </InputGroup>
        {
          this.state.query && (
            <EntryTransition style={{ position: 'absolute', width: '100%', zIndex: 1 }}>
              <ListGroup>
                {
                  this.state.users.length === 0 && <ListGroupItem>Searching...</ListGroupItem>
                }
                {
                  this.state.users.map(user => (
                    <ListGroupItem onClick={() => this.addMember(user)} tag='button' action key={user.id}>{user.name}</ListGroupItem>
                  ))
                }
              </ListGroup>
            </EntryTransition>
          )
        }
        {this.state.members.count() > 0 && (
          <>
            <EntryTransition>
              <ListGroup className='mt-2 mb-3'>
                {
                  this.state.members.toArray().map(user => (
                    <ListGroupItem onClick={() => this.deleteMember(user)} tag='button' action key={user.id}>{user.name}</ListGroupItem>
                  ))
                }
              </ListGroup>
              <Button color='default' onClick={() => this.createRoom()}>Start conversation</Button>
            </EntryTransition>
          </>
        )}
        {
          this.state.roomId && <Redirect to={`/conversation/${this.state.roomId}`} />
        }
      </SpinnerContainer>
    )
  }

  componentDidMount () {
    this.subscription = this.usersSearchService.results.subscribe(users => this.setState({ users }))
  }

  componentWillUnmount () {
    this.subscription.unsubscribe()
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setQuery(event.currentTarget.value)
  }

  setQuery = (query: string) => {
    this.setState({ query })
    this.usersSearchService.search(query)
  }

  addMember (user: User) {
    this.setState(({ members }) => ({ members: members.set(user.id, user), query: '' }))
  }

  deleteMember (user: User) {
    this.setState(({ members }) => ({ members: members.delete(user.id) }))
  }

  createRoom () {
    this.setState({ isLoading: true })
    this.roomsService
      .createRoom(this.state.members.toArray())
      .subscribe(roomId => roomId != null && this.setState({ roomId, isLoading: false }))
  }

}
