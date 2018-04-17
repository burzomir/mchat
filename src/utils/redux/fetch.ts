export default function createFetchUtil<T> (module: string, initialState: State<T>): FetchUtil<T> {

  const actionTypes: ActionTypes = {
    fetchData: `FETCH_${module}_DATA`,
    receiveData: `RECEIVE_${module}_DATA`
  }

  return {
    fetchData: () => ({
      type: actionTypes.fetchData
    }),
    receiveData: (data) => ({
      type: actionTypes.receiveData,
      data
    }),
    reducer: createReducer(initialState, actionTypes)
  }
}

function createReducer<T> (initialState: State<T>, actionTypes: ActionTypes): Reducer<T> {
  return (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.fetchData:
        return { ...state, isLoading: true }
      case actionTypes.receiveData:
        return {
          data: action.data
            ? action.data
            : state.data,
          isLoading: false
        }
      default:
        return state
    }
  }
}

export type State<T> = {
  data: T
  isLoading: boolean
}

type Action<T> = {
  type: string
  data?: T
}

type Reducer<T> = {
  (state: State<T>, action: Action<T>): State<T>
}

type FetchUtil<T> = {
  fetchData: () => Action<T>
  receiveData: (data: T) => Action<T>
  reducer: Reducer<T>
}

type ActionTypes = {
  fetchData: string
  receiveData: string
}
