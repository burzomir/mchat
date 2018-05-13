import { connect } from 'react-redux'
import { UserProfile as UserProfileComponent } from '../components'
import { user as userSelector } from '../selectors'
import { signOut } from '../actions'

export const UserProfile = connect(
  (state: any) => ({ user: userSelector.data(state) }),
  (dispatch) => ({
    onSignOut: () => dispatch(signOut())
  })
)(UserProfileComponent)
