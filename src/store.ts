import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createReducer } from './services/fetch'

export default function create () {
  return createStore(
    getRootReducer(),
    composeWithDevTools(
      applyMiddleware()
    )
  )
}

const rooms = createReducer<string[], string>('Rooms', { loading: false, data: [] })
const people = createReducer<string[], string>('People', { loading: false, data: [] })

function getRootReducer () {
  return combineReducers({
    rooms,
    people
  })
}
