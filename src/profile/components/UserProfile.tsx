import * as React from 'react'
import { Button } from '../../ui'
import { User } from '../../users/types'

type Props = {
  user?: User,
  onSignOut: VoidFunction
}

export const UserProfile: React.SFC<Props> = ({ user, onSignOut }) => {
  return (
    <div>
      {
        user && (
          <>
            <p>{user.name}</p>
            <p>{user.status}</p>
          </>
        )
      }
      <Button onClick={onSignOut}>Sign out</Button>
    </div>
  )
}
