import { Map } from 'immutable'

export type FetchDataAction = {
  type: 'FETCH_DATA'
  module?: string
}

export type ReceiveDataAction<Data> = {
  type: 'RECEIVE_DATA'
  module?: string
  data: Data
}

export type ReceiveErrorAction<Error> = {
  type: 'RECEIVE_ERROR'
  module?: string
  error: Error
}

export type Action<Data, Error> = FetchDataAction | ReceiveDataAction<Data> | ReceiveErrorAction<Error>

export type DataState<Data, Error> = {
  loading: boolean,
  data: Data
  error?: Error
}

export type State = {
  data: Map<string, DataState<any, any>>
}
