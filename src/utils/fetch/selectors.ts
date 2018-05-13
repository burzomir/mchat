import { State, DataState } from './types'

export const createSelector = <Data, Error>(module: string) => {
  return ({ data }: State): DataState<Data, Error> | undefined => data.get(module)
}
