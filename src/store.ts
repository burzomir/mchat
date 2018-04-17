import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createFetchUtil from './utils/redux/fetch'

export default function create () {
  return createStore(
    getRootReducer(),
    composeWithDevTools(
      applyMiddleware()
    )
  )
}

function getRoomFetchUtil () {
  return createFetchUtil<string[]>('ROOM', { data: [], isLoading: false })
}

function getRootReducer () {
  return combineReducers({
    rooms: rooms.reducer
  })
}

const rooms = getRoomFetchUtil()
