import { BehaviorSubject } from 'rxjs'
import { Member } from './member'
import firebase from '../third-party/firebase'

export class MembersService {

  private static instances: Map<string, MembersService> = new Map()

  private _members = new BehaviorSubject<Member[]>([])

  private constructor (roomId: string) {
    firebase
      .database()
      .ref(`rooms/${roomId}/members`)
      .on('value', snapshot => this._members.next(snapshot && snapshot.val() || []))
  }

  static getForRoom (roomId: string) {
    let membersService = MembersService.instances.get(roomId)
    if (!membersService) {
      membersService = new MembersService(roomId)
      MembersService.instances.set(roomId, membersService)
    }
    return membersService
  }

  get members () {
    return this._members
  }

}
