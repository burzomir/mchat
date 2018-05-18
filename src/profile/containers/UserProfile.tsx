import { connect } from 'react-redux'
import { UserProfile as UserProfileComponent } from '../components'
import { userProfile } from '../selectors'
import { signOut } from '../actions'

export const UserProfile = connect(
  (state: any) => ({ user: userProfile.data(state) }),
  (dispatch) => ({
    onSignOut: () => dispatch(signOut())
  })
)(UserProfileComponent)