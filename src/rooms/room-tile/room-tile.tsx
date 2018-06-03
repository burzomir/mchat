import * as React from 'react'
import { Subscription } from 'rxjs'
import { Badge } from 'reactstrap'
import { Member } from '../member'
import { MembersService } from '../members.service'
import { MessagesService } from '../messages.service'

export class RoomTile extends React.Component<Props> {

  state: State = {
    members: [],
    unreadMessagesCount: 0
  }

  subscriptions: Subscription[] = []

  render () {
    return (
      <div className='d-flex justify-content-between'>
        <div className='text-truncate mr-1'>
          {
            this.state.members
              .map(member => member.name)
              .join(', ')
          }
        </div>
        { this.state.unreadMessagesCount > 0 && <Badge color='info'>{this.state.unreadMessagesCount}</Badge> }
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
        .subscribe(messages => this.setState({
          unreadMessagesCount: messages.filter(message => message.isUnread).length
        }))

    )
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
  unreadMessagesCount: number
}
