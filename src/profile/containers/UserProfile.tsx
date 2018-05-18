import { connect } from 'react-redux'
import { UserProfile as UserProfileComponent } from '../components'
import { myProfile } from '../selectors'
import { signOut } from '../actions'

export const UserProfile = connect(
  (state: any) => ({ user: myProfile(state).some() }),
  (dispatch) => ({
    onSignOut: () => dispatch(signOut())
  })
)(UserProfileComponent)
