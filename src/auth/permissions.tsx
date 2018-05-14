import { PermissionCheck } from '../ui'
import { user } from './selectors'

export const AuthenticatedUser: PermissionCheck = (state) => Boolean(user.data(state))
