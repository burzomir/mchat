import { PermissionCheck } from '../ui'
import { user } from './selectors'

export const User: PermissionCheck = (state) => Boolean(user.data(state))
