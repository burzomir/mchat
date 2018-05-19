import firebase from '../third-party/firebase'
import { Store, ActionCreator } from 'react-redux'
import { Maybe } from 'monet'
import { lift } from 'ramda'
import { User } from './types'
import { addUser, updateUser, removeUser } from './actions'

const { fromNull } = Maybe

export const UsersService = {
  init: (store: Store<any>) => {
    handlers = createHandlers(store)
    handlers.forEach(({ event, handler }) => ref.on(event, handler))
  },
  update: ({ id, ...rest }: User) => ref.child(id).update(rest),
  destroy: () => handlers.forEach(({ event, handler }) => ref.off(event, handler))
}

const ref = firebase.database().ref('users')
let handlers: Handler[]

const createHandlers = (store: Store<any>) => {
  const dispatch = (actionCreator: ActionCreator<any>) => (snapshot: firebase.database.DataSnapshot) => {
    mapSnapshotToUser(snapshot).map(user => store.dispatch(actionCreator(user)))
  }
  return [
    {
      event: 'child_added',
      handler: dispatch(addUser)
    },
    {
      event: 'child_changed',
      handler: dispatch(updateUser)
    },
    {
      event: 'child_removed',
      handler: dispatch(removeUser)
    }
  ]
}

const mapSnapshotToUser = (s: firebase.database.DataSnapshot | null): Maybe<User> => {
  const snapshot = fromNull(s)
  const id = snapshot.flatMap(s => fromNull(s.key))
  const data = snapshot.flatMap(s => fromNull(s.val()))
  return lift((id: string, data: Partial<User>) => ({ id, ...data }))(id, data)
}

type Handler = {
  event: string,
  handler: (snapshot: firebase.database.DataSnapshot) => void
}
