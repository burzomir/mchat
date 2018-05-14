import * as React from 'react'
import { UserProfile as TUserProfile } from '../types'
import { Button } from '../../ui'

type Props = {
  user?: TUserProfile,
  onSignOut: VoidFunction
}

export const UserProfile: React.SFC<Props> = ({ user, onSignOut }) => {
  return (
    <div>
      {
        user && (
          <>
            <p>{user.username}</p>
            <p>{user.status}</p>
          </>
        )
      }
      <Button onClick={onSignOut}>Sign out</Button>
    </div>
  )
}
