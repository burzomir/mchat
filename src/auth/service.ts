import firebase from '../third-party/firebase'
import { Credentials, User } from './types'

export const register = ({ email, password }: Credentials) => {
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(resolveWithUser)
}

export const signIn = ({ email, password }: Credentials) => {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(resolveWithUser)
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
  displayName,
  email: email || ''
})
