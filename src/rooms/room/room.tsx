import * as React from 'react'
import { Subscription } from 'rxjs'
import { prop, tap } from 'ramda'
import { Message } from '../message'
import { Member } from '../member'
import { MembersService } from '../members.service'
import { MessagesService } from '../messages.service'
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap'
import { Maybe } from 'monet'

export class Room extends React.Component<Props> {

  state: State = {
    members: [],
    messages: [],
    message: ''
  }

  subscriptions: Subscription[] = []
  messagesService: MessagesService
  membersService: MembersService
  scrollRef = React.createRef<HTMLDivElement>()

  render () {
    return (
      <div className='d-flex flex-column h-100'>
        <div className='d-flex justify-content-between flex-shrink-0'>
          <h3 className='text-truncate'>
            {
              this.state.members.map(prop('name')).join(', ')
            }
          </h3>
          <Button color='light'>Play</Button>
        </div>
        <div className='flex-grow-1 mt-5 mb-2' style={{ overflowY: 'auto' }} ref={this.scrollRef}>
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
        })
    )

    MessagesService.getForRoom(this.props.id).markAllAsRead()
  }

  componentWillUnmount () {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  renderMessage = (message: Message) => {
    const author = this.state.members.find(member => member.id === message.authorId)
    return (
      <p key={message.id}>
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
    this.messagesService
      .send(
        Message.create({
          id: this.state.message,
          authorId: '1',
          content: this.state.message,
          creationDate: new Date(),
          isUnread: true
        })
      )
      .subscribe(() => {
        this.setState({ message: '' })
      })
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
}
