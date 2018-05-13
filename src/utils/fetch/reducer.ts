import { Map } from 'immutable'
import { DataState, Action } from './types'

export const reducer = (state = Map<string, DataState<any, any>>(), action: Action<any, any>) => {

  if (action.module === undefined) {
    return state
  }

  switch (action.type) {
    case 'FETCH_DATA':
      return state.update(action.module, (value) => ({ ...value, loading: true }))
    case 'RECEIVE_DATA':
      return state.set(action.module, { loading: false, data: action.data })
    case 'RECEIVE_ERROR':
      return state.update(action.module, (value) => ({ ...value, loading: false, error: action.error }))
    case 'RESET_DATA':
      return state.set(action.module, { loading: false })
    default:
      return state
  }
}
