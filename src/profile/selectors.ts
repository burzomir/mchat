import { State as DataState } from '../utils/fetch/types'
import { State } from '../users/types'
import { Maybe } from 'monet'
import { user } from '../auth/selectors'
import { UserProfile } from './types'

export const myProfile = (state: State & DataState) => {
  return Maybe
    .fromNull(user.data(state))
    .map(user => user.id)
    .flatMap(id => Maybe.fromNull(state.users.get(id) as UserProfile))
}
