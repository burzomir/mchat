import { BehaviorSubject } from 'rxjs'

export class RoomsService {

  private static instances: Map<string, RoomsService> = new Map()

  private _rooms = new BehaviorSubject<string[]>([])

  private constructor () {
    this._rooms.next(['1', '2', '3', '4'])
  }

  static getForUser (userId: string) {
    let roomsService = RoomsService.instances.get(userId)
    if (!roomsService) {
      roomsService = new RoomsService()
      RoomsService.instances.set(userId, roomsService)
    }
    return roomsService
  }

  get rooms () {
    return this._rooms
  }

}
