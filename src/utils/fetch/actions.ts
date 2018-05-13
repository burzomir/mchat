import { FetchDataAction, ReceiveDataAction, ReceiveErrorAction, ResetDataAction } from './types'

export function fetch (module: string) {
  return (): FetchDataAction => ({
    type: 'FETCH_DATA',
    module
  })
}

export function receiveData<Data> (module: string) {
  return (data: Data): ReceiveDataAction<Data> => ({
    type: 'RECEIVE_DATA',
    module,
    data
  })
}

export function receiveError<Error> (module: string) {
  return (error: Error): ReceiveErrorAction<Error> => ({
    type: 'RECEIVE_ERROR',
    module,
    error
  })
}

export function resetData (module: string) {
  return (): ResetDataAction => ({
    type: 'RESET_DATA',
    module
  })
}

export function createActions<Data, Error> (module: string) {
  return {
    fetch: fetch(module),
    receiveData: receiveData<Data>(module),
    receiveError: receiveError<Error>(module),
    resetData: resetData(module)
  }
}
