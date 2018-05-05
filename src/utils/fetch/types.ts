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

export type State<Data, Error> = {
  loading: boolean,
  data: Data
  error?: Error
}

export type Reducer<Data, Error> = {
  (state: State<Data, Error>, action: Action<Data, Error>): State<Data, Error>
}
