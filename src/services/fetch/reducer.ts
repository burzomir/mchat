import { Reducer, State } from './types'

export function createReducer<Data, Error> (module: string, initialState: State<Data, Error>): Reducer<Data, Error> {
  return (state = initialState, action) => {

    if (action.module !== module) {
      return state
    }

    switch (action.type) {
      case 'FETCH_DATA':
        return {
          loading: true,
          data: state.data
        }
      case 'RECEIVE_DATA':
        return {
          loading: false,
          data: action.data
        }
      case 'RECEIVE_ERROR':
        return {
          loading: false,
          data: state.data,
          error: action.error
        }
      default:
        return state
    }

  }
}
