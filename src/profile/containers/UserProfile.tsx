import { connect } from 'react-redux'
import { UserProfile as UserProfileComponent } from '../components'
import { myProfile } from '../selectors'
import { signOut } from '../actions'
import { User } from '../../users/types'

export const UserProfile = connect(
  (state: any) => ({ user: myProfile(state).some() as User }),
  (dispatch) => ({
    onSignOut: () => dispatch(signOut())
  })
)(UserProfileComponent)
