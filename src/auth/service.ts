import firebase from '../third-party/firebase'
import { Credentials, User } from './types'

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

export const getCurrentUser = () => {
  const { currentUser } = firebase.auth()
  return currentUser === null
    ? Promise.reject(undefined)
    : resolveWithUser(currentUser)
}

const resolveWithUser = (user: firebase.User) => {
  return Promise.resolve<User>(mapFirebaseUserToUser(user))
}

const mapFirebaseUserToUser = ({ displayName, email }: firebase.User): User => ({
  name: displayName,
  email: email || ''
})
