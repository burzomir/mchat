import { State, DataState } from './types'

export const createSelectors = <Data, Error>(moduleName: string) => {
  const module = ({ data }: State): DataState<Data, Error> => data.get(moduleName, { loading: false })
  const data = (state: State, defaultData?: Data) => module(state).data || defaultData
  const error = (state: State) => module(state).error
  const loading = (state: State) => module(state).loading
  return {
    module,
    data,
    error,
    loading
  }
}
