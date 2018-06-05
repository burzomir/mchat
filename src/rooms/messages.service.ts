import { BehaviorSubject, from } from 'rxjs'
import { Message } from './message'
import firebase from '../third-party/firebase'
import { Maybe } from 'monet'
import { tap } from 'ramda'

export class MessagesService {

  private static instances: Map<string, MessagesService> = new Map()

  private _messages = new BehaviorSubject<Message[]>([])
  private messagesRef: firebase.database.Reference

  private constructor (roomId: string) {
    this.messagesRef = firebase.database().ref(`rooms/${roomId}/messages`)

    this.messagesRef.on('value', (snapshot) => {
      Maybe
        .fromNull(snapshot)
        .flatMap(snapshot => Maybe.fromNull(snapshot.val()))
        .map(messagesData => Object.keys(messagesData).reduce((messages, id) => [...messages, Message.create({ id, ...messagesData[id] })], []))
        .map(tap(messages => this._messages.next(messages)))
        .orElseRun(() => this._messages.next([]))
    })
  }

  static getForRoom (roomId: string) {
    let messagesService = MessagesService.instances.get(roomId)
    if (!messagesService) {
      messagesService = new MessagesService(roomId)
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

  send ({ authorId, content }: Pick<Message, 'authorId' | 'content'>) {
    const newMessageRef = this.messagesRef.push()
    return from(newMessageRef.set({
      authorId,
      content,
      creationDate: (new Date()).toISOString()
    }))
  }

}
