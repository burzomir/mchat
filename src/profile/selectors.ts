import { createSelectors } from '../utils/fetch'
import { UserProfile } from './types'
import { ModuleNames } from './moduleNames'

export const userProfile = createSelectors<UserProfile, string>(ModuleNames.UserProfile)
