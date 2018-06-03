import * as React from 'react'
import { Subscription } from 'rxjs'
import { Message } from '../message'
import { Member } from '../member'
import { MembersService } from '../members.service'
import { MessagesService } from '../messages.service'

export class Room extends React.Component<Props> {

  state: State = {
    members: [],
    messages: []
  }

  subscriptions: Subscription[] = []

  render () {
    return (
      <div>
        <h1>Members</h1>
        <ul>
          {
            this.state.members.map(member => <li key={member.id}>{member.name}</li>)
          }
        </ul>
        <h1>Messages</h1>
        <ul>
          {
            this.state.messages.map(message => <li key={message.id}>{message.content}</li>)
          }
        </ul>
      </div>
    )
  }

  componentDidMount () {
    this.subscriptions.push(
      MembersService
        .getForRoom(this.props.id)
        .members.subscribe(members => this.setState({ members })),

      MessagesService
        .getForRoom(this.props.id)
        .messages
        .subscribe(messages => this.setState({ messages }))
    )

    MessagesService.getForRoom(this.props.id).markAllAsRead()
  }

  componentWillUnmount () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}

interface Props {
  id: string
}

interface State {
  members: Member[]
  messages: Message[]
}
