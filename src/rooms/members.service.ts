import { BehaviorSubject } from 'rxjs'
import { Member } from './member'

export class MembersService {

  private static instances: Map<string, MembersService> = new Map()

  private _members = new BehaviorSubject<Member[]>([])

  private constructor () {
    this._members.next([
      Member.create({
        id: '1',
        name: 'Michał Kłobukowski',
        status: 'online'
      }),
      Member.create({
        id: '2',
        name: 'Mateusz Ollik',
        status: 'online'
      })
    ])
  }

  static getForRoom (roomId: string) {
    let membersService = MembersService.instances.get(roomId)
    if (!membersService) {
      membersService = new MembersService()
      MembersService.instances.set(roomId, membersService)
    }
    return membersService
  }

  get members () {
    return this._members
  }

}
