import { BehaviorSubject } from 'rxjs'
import { Message } from './message'

export class MessagesService {

  private static instances: Map<string, MessagesService> = new Map()

  private _messages = new BehaviorSubject<Message[]>([])

  private constructor () {
    this._messages.next([
      Message.create({
        id: '1',
        authorId: '1',
        content: 'Hello world!',
        creationDate: '2018-06-02T23:38:30.413Z',
        isUnread: true
      }),
      Message.create({
        id: '2',
        authorId: '1',
        content: 'Hello world!',
        creationDate: '2018-06-02T23:38:30.413Z',
        isUnread: true
      }),
      Message.create({
        id: '3',
        authorId: '1',
        content: 'Hello world!',
        creationDate: '2018-06-02T23:38:30.413Z',
        isUnread: false
      })
    ])
  }

  static getForRoom (roomId: string) {
    let messagesService = MessagesService.instances.get(roomId)
    if (!messagesService) {
      messagesService = new MessagesService()
      MessagesService.instances.set(roomId, messagesService)
    }
    return messagesService
  }

  get messages () {
    return this._messages
  }

  markAllAsRead () {
    this._messages.next(
      this._messages
        .getValue()
        .map(message => {
          message.isUnread = false
          return message
        })
    )
  }

}
