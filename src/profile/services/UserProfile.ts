import firebase from '../../third-party/firebase'
import { UserProfile } from '../types'
import { setUserProfile } from '../actions'
import { Store } from 'react-redux'
import { Maybe } from 'monet'
import { user } from '../../auth/selectors'

export class UserProfileService {

  private static instance: UserProfileService | null = null

  private ref = firebase.database().ref('/users')
  private userRef: firebase.database.Reference | null
  private unsubscribeFromStore: () => void

  constructor (private store: Store<any>) {
    this.unsubscribeFromStore = store.subscribe(this.handleStoreUpdate)
  }

  static init (store: Store<any>) {
    this.instance = this.instance || new UserProfileService(store)
    return this.instance
  }

  static destroy () {
    Maybe
      .fromNull(this.instance)
      .map(instance => instance.unsubscribeFromStore)
      .map(unsubscribe => unsubscribe())
  }

  public update (data: UserProfile) {
    if (this.userRef) {
      this.userRef.update(data)
    }
  }

  private handleStoreUpdate = () => {
    const data = user.data(this.store.getState())

    if (this.userRef && data === undefined) {
      this.userRef.off('value', this.handleValue)
      this.userRef = null
    } else if (!this.userRef) {
      Maybe
        .fromNull(data)
        .map(data => {
          this.userRef = this.ref.child(data.id)
          this.userRef.on('value', this.handleValue)
        })
    }
  }

  private handleValue = (snapshot: firebase.database.DataSnapshot | null) => {
    Maybe
      .fromNull(snapshot)
      .flatMap(snapshot => Maybe.fromNull(snapshot.val()))
      .toEither()
      .cata(
        () => {
          Maybe
            .fromNull(user.data(this.store.getState()))
            .map(data => this.update({ status: 'online', username: data.email }))
        },
        (data) => {
          this.store.dispatch(setUserProfile(data))
        }
      )
  }
}
