import { ActionType, Action } from './types'

export const startLoading = (spinnerName: string): Action => ({
  type: ActionType.StartLoading,
  spinnerName
})

export const stopLoading = (spinnerName: string): Action => ({
  type: ActionType.StopLoading,
  spinnerName
})
