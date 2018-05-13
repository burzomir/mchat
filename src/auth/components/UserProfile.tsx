import * as React from 'react'
import { User } from '../types'

type Props = {
  user?: User
}

export const UserProfile: React.SFC<Props> = ({ user }) => {
  return (
    <div>
      <p>{user && user.name}</p>
      <p>{user && user.email}</p>
    </div>
  )
}
