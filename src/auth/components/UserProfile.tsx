import * as React from 'react'
import { User } from '../types'
import { Button } from '../../ui'

type Props = {
  user?: User,
  onSignOut: VoidFunction
}

export const UserProfile: React.SFC<Props> = ({ user, onSignOut }) => {
  return (
    <div>
      <p>{user && user.name}</p>
      <p>{user && user.email}</p>
      <Button onClick={onSignOut}>Sign out</Button>
    </div>
  )
}
