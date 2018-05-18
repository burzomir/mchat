import firebase from '../third-party/firebase'
import { Credentials, User } from './types'
import { Store } from 'react-redux'
import { startLoading, stopLoading } from '../ui/components/Spinner'
import { receiveUser } from './actions'
import { ModuleNames } from './moduleNames'

export const signUp = ({ email, password }: Credentials) => {
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(resolveWithUser)
    .catch((error: firebase.FirebaseError) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return Promise.reject({ email: error.message })
        default:
          return Promise.reject(undefined)
      }
    })
}

export const signIn = ({ email, password }: Credentials) => {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(resolveWithUser)
    .catch((error: firebase.FirebaseError) => {
      switch (error.code) {
        case 'auth/user-not-found':
          return Promise.reject({ email: error.message })
        case 'auth/wrong-password':
          return Promise.reject({ password: error.message })
        default:
          return Promise.reject(undefined)
      }
    })
}

export const signOut = () => {
  return firebase.auth().signOut()
}

// TODO: move to actions
export const restoreUser = (store: Store<any>) => {
  store.dispatch(startLoading(ModuleNames.AuthenticationSpinner))
  getCurrentUser()
  .then(user => {
    store.dispatch(receiveUser(user))
    store.dispatch(stopLoading(ModuleNames.AuthenticationSpinner))
  })
  .catch(() => {
    store.dispatch(stopLoading(ModuleNames.AuthenticationSpinner))
  })
}

export const getCurrentUser = () => {
  return new Promise<User>((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      user ? resolve(mapFirebaseUserToUser(user)) : reject(user)
    })
  })
}

const resolveWithUser = (user: firebase.User) => {
  return Promise.resolve<User>(mapFirebaseUserToUser(user))
}

const mapFirebaseUserToUser = ({ displayName, email, uid }: firebase.User): User => ({
  id: uid,
  name: displayName,
  email: email || ''
})
