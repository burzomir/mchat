import * as React from 'react'
import { Set } from 'immutable'
import { Button } from '../../ui'

interface RoomFormProps { }

interface RoomFormState {
  members: Set<string>
  query: string
}

export class RoomForm extends React.Component<RoomFormProps, RoomFormState> {

  state: RoomFormState = {
    members: Set(),
    query: ''
  }

  render () {
    return (
      <div>
        <ul>
          {
            this.state.members.toArray().map(member => (
              <li key={member}>
                <span>{member}</span>
                <Button onClick={() => this.deleteMember(member)}>&times;</Button>
              </li>
            ))
          }
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.query} onChange={this.handleQueryChange} />
          <button>Add</button>
        </form>
      </div>
    )
  }

  handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault()
    this.addMember(this.state.query)
    this.setQuery('')
  }

  handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setQuery(event.currentTarget.value)
  }

  setQuery = (query: string) => {
    this.setState({ query })
  }

  addMember = (member: string) => {
    this.setState(({ members }) => ({ members: members.add(member) }))
  }

  deleteMember = (member: string) => {
    this.setState(({ members }) => ({ members: members.delete(member) }))
  }

}