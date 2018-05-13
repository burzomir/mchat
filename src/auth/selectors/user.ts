import { createSelectors } from '../../utils/fetch'
import { User } from '../types'
import { ModuleNames } from '../moduleNames'

export const user = createSelectors<User, string>(ModuleNames.User)
