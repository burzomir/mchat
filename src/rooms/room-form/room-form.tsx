import * as React from 'react'
import { Input, InputGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { Subscription } from 'rxjs'
import { Map } from 'immutable'
import styled from 'styled-components'
import { UsersSearchService } from '../../users/users-search.service'
import { User } from '../../users/user'
import { EntryTransition } from '../../ui/components/EntryTransition'
import { RoomsService } from '../rooms.service'

interface RoomFormProps { }

interface RoomFormState {
  members: Map<string, User>
  users: User[]
  query: string
}

export class RoomForm extends React.Component<RoomFormProps, RoomFormState> {

  state: RoomFormState = {
    members: Map(),
    users: [],
    query: ''
  }

  usersSearchService = UsersSearchService.create()
  roomsService = RoomsService.getForUser('bA1AgO6Sckaq7bSPvzHgXd4PDH52')

  subscription: Subscription

  render () {
    return (
      <div>
        <h1>New room</h1>
        <div className='d-flex align-items-center justify-content-between'>
          <h2>Members</h2>
          <SearchBoxContainer membersCount={this.state.members.count()}>
            <InputGroup size='lg'>
              <Input placeholder='Type in to find new people' type='text' value={this.state.query} onChange={this.handleQueryChange} />
            </InputGroup>
            {
              this.state.query && (
                <EntryTransition>
                  <ListGroup style={{ position: 'absolute', width: '100%' }}>
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
          </SearchBoxContainer>
        </div>
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
      </div>
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
    this.roomsService.createRoom(this.state.members.toArray())
  }

}

const SearchBoxContainer = styled.div`
  position: relative;
  width: 30%;
  transition: transform ease-in-out 0.3s;
  transform: ${(props: { membersCount: number }) => props.membersCount === 0 ? 'translate(-120%, 240%)' : 'none'};
  z-index: 1;
`
