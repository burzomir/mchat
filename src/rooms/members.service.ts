import { BehaviorSubject, from } from 'rxjs'
import { Member, MemberAttrs } from './member'
import firebase from '../third-party/firebase'
import { map, switchMap, tap } from 'rxjs/operators'

export class MembersService {

  private static instances: Map<string, MembersService> = new Map()

  private _members = new BehaviorSubject<string[]>([])

  private constructor (roomId: string) {
    firebase
      .database()
      .ref(`rooms/${roomId}/members`)
      .on('value', snapshot => this._members.next(snapshot && Object.keys(snapshot.val()) || []))
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
    return this._members.pipe(
      map(memberIds => memberIds.map(id => firebase.database().ref(`users/${id}`).once('value'))),
      switchMap(promises => from(Promise.all(promises))),
      map((snapshots: firebase.database.DataSnapshot[]) => snapshots.map(snapshot => ({ id: snapshot.key, ...snapshot.val() }))),
      map(values => values.map((memberAttrs: MemberAttrs) => Member.create(memberAttrs))),
      tap(console.log)
    )
  }

}
