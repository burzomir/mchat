import * as React from 'react'
import { Subscription } from 'rxjs'
import { prop, tap } from 'ramda'
import { Message } from '../message'
import { Member } from '../member'
import { MembersService } from '../members.service'
import { MessagesService } from '../messages.service'
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { Maybe } from 'monet'
import { User } from '../../users/user'
import { CurrentUserService } from '../../users/user.service'

export class Room extends React.Component<Props> {

  state: State = {
    members: [],
    messages: [],
    message: '',
    user: null
  }

  subscriptions: Subscription[] = []
  messagesService: MessagesService
  membersService: MembersService
  currentUserService = CurrentUserService.getInstance()

  scrollRef = React.createRef<HTMLDivElement>()

  render () {
    return (
      <div className='d-flex flex-column h-100'>
        <div className='d-flex justify-content-between flex-shrink-0'>
          <h3 className='text-truncate'>
            {
              this.getMembers().map(prop('name')).join(', ')
            }
          </h3>
          <Button color='light'>Play</Button>
        </div>
        <div className='flex-grow-1 mt-5 mb-2 pr-5' style={{ overflowY: 'auto', marginRight: '-3rem' }} ref={this.scrollRef}>
          {
            this.state.messages.map(this.renderMessage)
          }
        </div>
        <form onSubmit={this.handleMessageSubmit}>
          <InputGroup size='lg' className=' flex-shrink-0'>
            <Input placeholder='Type your message' type='text' value={this.state.message} onChange={this.handleMessageChange} />
            <InputGroupAddon addonType='append'><Button color='primary'>Send</Button></InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    )
  }

  getMembers = () => {
    return this.state.members
      .filter(member => {
        const { user } = this.state
        return user ? member.id !== user.id : true
      })
  }

  componentDidMount () {
    this.messagesService = MessagesService.getForRoom(this.props.id)
    this.membersService = MembersService.getForRoom(this.props.id)

    this.subscriptions.push(
      this.membersService
        .members.subscribe(members => this.setState({ members })),

      this.messagesService
        .messages
        .subscribe(messages => {
          this.setState({ messages })
          this.scrollToBottom()
        }),

      this.currentUserService
        .currentUser
        .subscribe(user => this.setState({ user }))
    )

    MessagesService.getForRoom(this.props.id).markAllAsRead()
  }

  componentWillUnmount () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  renderMessage = (message: Message) => {
    const author = this.state.members.find(member => member.id === message.authorId)
    const { user } = this.state
    const className = user && message.authorId === user.id ? 'text-right' : ''
    return (
      <p key={message.id} className={className}>
        <strong>{author ? author.name : '[user deleted]'}</strong>
        <br />
        <span>{message.content}</span>
      </p>
    )
  }

  handleMessageChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ message: event.currentTarget.value })
  }

  handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { user } = this.state
    if (user) {
      this.subscriptions.push(
        this.messagesService
          .send({
            authorId: user.id,
            content: this.state.message
          })
          .subscribe(() => {
            this.setState({ message: '' })
          })
      )
    }
  }

  scrollToBottom = () => {
    setTimeout(() => {
      Maybe
        .fromNull(this.scrollRef.current)
        .map(tap(el => el.scrollTop = el.scrollHeight))
    })
  }

}

interface Props {
  id: string
}

interface State {
  members: Member[]
  messages: Message[]
  message: string
  user: User | null
}
