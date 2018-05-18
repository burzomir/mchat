import { connect } from 'react-redux'
import { SpinnerContainer } from './SpinnerContainer'
import { State } from './types'

type Props = {
  name: string
}

export const ConnectedSpinnerContainer = connect(
  (state: State, props: Props) => ({
    loading: state.spinner.get(props.name, false)
  })
)(SpinnerContainer)
