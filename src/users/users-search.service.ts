import { Subject, from, merge, Observable } from 'rxjs'
import { debounceTime, map, switchMap, filter } from 'rxjs/operators'
import firebase from '../third-party/firebase'
import { User } from './user'

export class UsersSearchService {

  private usersRef = firebase.database().ref('users')

  private _results = new Subject<string>()

  private constructor () { }

  static create () {
    return new UsersSearchService()
  }

  get results (): Observable<User[]> {
    const validQuery = this._results.pipe(filter(query => query.length > 1))
    const invalidQuery = this._results.pipe(filter(query => query.length < 2))

    return merge(
      validQuery.pipe(
        debounceTime(1000),
        switchMap(query => from(this.createSearchRef(query))),
        map(snapshot => this.transformSnapshot(snapshot))
      ),
      invalidQuery.pipe(
        map(query => [])
      )
    )

  }

  search (query: string) {
    this._results.next(query)
  }

  createSearchRef (query: string) {
    return this.usersRef
      .orderByChild('name')
      .startAt(query)
      .endAt(query + '\uf8ff')
      .once('value')
  }

  transformSnapshot (snapshot: firebase.database.DataSnapshot) {
    const val = snapshot.val()
    return Object
      .keys(val)
      .reduce((users, id) => [...users, User.create({ id, ...val[id] })], [])
  }

}
