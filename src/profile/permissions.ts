import { PermissionCheck } from '../ui'
import { State as DataState } from '../utils/fetch/types'
import { State } from '../users/types'
import { myProfile } from './selectors'
import { Maybe } from 'monet'

export const UserWithProfile: PermissionCheck = (state: State & DataState) => {
  return myProfile(state)
    .flatMap(profile => Maybe.fromNull(profile.username))
    .isSome()
}
