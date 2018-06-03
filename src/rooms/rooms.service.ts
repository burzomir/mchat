import { BehaviorSubject } from 'rxjs'
import firebase from '../third-party/firebase'

export class RoomsService {

  private static instances: Map<string, RoomsService> = new Map()

  private _rooms = new BehaviorSubject<string[]>([])

  private constructor (userId: string) {
    const ref = firebase.database().ref(`rooms/${userId}`)
    ref.on('value', (data) => {
      this._rooms.next(data && Object.keys(data.val()) || [])
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

}
