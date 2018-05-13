import { connect } from 'react-redux'
import { UserProfile as UserProfileComponent } from '../components'
import { user as userSelector } from '../selectors'

export const UserProfile = connect((state: any) => {
  const user = userSelector(state)
  return {
    user: user && user.data
  }
})(UserProfileComponent)
