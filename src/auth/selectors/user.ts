import { createSelector } from '../../utils/fetch'
import { User } from '../types'
import { ModuleNames } from '../moduleNames'

export const user = createSelector<User, string>(ModuleNames.User)
