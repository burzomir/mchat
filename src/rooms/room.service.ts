import { BehaviorSubject } from 'rxjs'
import { Message } from './message'
import { Member } from './member'

export class RoomService {

  private static instances: Map<string, RoomService> = new Map()

  private _messages = new BehaviorSubject<Message[]>([])
  private _members = new BehaviorSubject<Member[]>([])

  private constructor () {
    this._messages.next([
      Message.create({
        id: '1',
        authorId: '1',
        content: `Hello`,
        creationDate: '2018-06-02T22:57:36.571Z',
        isUnread: false
      })
    ])

    this._members.next([
      Member.create({
        id: '1',
        name: 'Michał Kłobukowski',
        status: 'online'
      })
    ])
  }

  static getForRoom (roomId: string) {
    let roomService = RoomService.instances.get(roomId)
    if (roomService) {
      return roomService
    } else {
      roomService = new RoomService()
      RoomService.instances.set(roomId, roomService)
      return roomService
    }
  }

  get messages () {
    return this._messages
  }

  get members () {
    return this._members
  }

}
