import { BehaviorSubject, from } from 'rxjs'
import firebase from '../third-party/firebase'
import { Maybe } from 'monet'
import { tap } from 'ramda'
import { User } from '../users/user'

export class RoomsService {

  private static instances: Map<string, RoomsService> = new Map()

  private _rooms = new BehaviorSubject<string[]>([])

  private userRoomsRef: firebase.database.Reference
  private roomsRef: firebase.database.Reference

  private constructor (private userId: string) {
    this.userRoomsRef = firebase.database().ref(`user_rooms/${userId}`)
    this.roomsRef = firebase.database().ref('rooms')

    this.userRoomsRef.on('value', (data) => {
      Maybe
        .fromNull(data)
        .flatMap(data => Maybe.fromNull(data.val()))
        .map(tap(data => this._rooms.next(Object.keys(data))))
    })
  }

  static getForUser (userId: string) {
    let roomsService = RoomsService.instances.get(userId)
    if (!roomsService) {
      roomsService = new RoomsService(userId)
      RoomsService.instances.set(userId, roomsService)
    }
    return roomsService
  }

  get rooms () {
    return this._rooms
  }

  createRoom (members: User[]) {
    const newRoomRef = this.roomsRef.push()
    return from(
      newRoomRef
        .set({
          admin: this.userId,
          members: members.reduce((obj, member) => ({ ...obj, [member.id]: true }), {})
        })
        .then(() => this.userRoomsRef.update({ [newRoomRef.key as string]: true }))
        .then(() => Promise.resolve(newRoomRef.key))
    )
  }

  deleteRoom (roomId: string) {
    const roomRef = firebase.database().ref(`rooms/${roomId}`)
    const userRoomRef = firebase.database().ref(`user_rooms/${this.userId}/${roomId}`)
    return roomRef
      .remove()
      .then(() => userRoomRef.remove())
  }

}
