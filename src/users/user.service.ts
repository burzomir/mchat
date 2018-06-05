import firebase from '../third-party/firebase'
import { BehaviorSubject } from 'rxjs'
import { User } from './user'

export class CurrentUserService {

  private static instance: CurrentUserService

  private _currentUser = new BehaviorSubject<User | null>(null)

  private constructor () {
    firebase.auth().onAuthStateChanged(this.fetchUserData)
  }

  static getInstance () {
    this.instance = this.instance || new CurrentUserService()
    return this.instance
  }

  get currentUser () {
    return this._currentUser.pipe()
  }

  private fetchUserData = (user: firebase.User | null) => {
    if (user == null) {
      this._currentUser.next(null)
    } else {
      firebase
        .database()
        .ref(`users/${user.uid}`)
        .once('value')
        .then(data => this._currentUser.next(User.create(data.val())))
    }
  }

}
