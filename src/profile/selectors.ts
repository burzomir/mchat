import { State as DataState } from '../utils/fetch/types'
import { State, User } from '../users/types'
import { Maybe } from 'monet'
import { user } from '../auth/selectors'

export const me = (state: DataState) => {
  return Maybe
    .fromNull(user.data(state))
}

export const myId = (state: DataState) => {
  return me(state)
    .map(user => user.id)
}

export const myProfile = (state: State & DataState) => {
  return myId(state)
    .flatMap(id => Maybe.fromNull(state.users.get(id) as User))
}
