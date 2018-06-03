import * as React from 'react'
import { Input, InputGroup } from 'reactstrap'
import { Subscription } from 'rxjs'
import { Map } from 'immutable'
import { UsersSearchService } from '../../users/users-search.service'
import { User } from '../../users/user'

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
  subscription: Subscription

  render () {
    return (
      <div>
        <h1>New room</h1>
        <InputGroup>
          <Input placeholder='Type in to find new people' type='text' value={this.state.query} onChange={this.handleQueryChange} />
        </InputGroup>
        <ul>
          {
            this.state.users.map(user => (
              <li key={user.id} onClick={() => this.addMember(user)}>
                <span>{user.name}</span>
              </li>
            ))
          }
        </ul>
        <ul>
          {
            this.state.members.toArray().map(member => (
              <li key={member.id} onClick={() => this.addMember(member)}>
                <span>{member.name}</span>
              </li>
            ))
          }
        </ul>
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
    this.setState(({ members }) => ({ members: members.set(user.id, user) }))
  }

}
