import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'
import { createReducer } from './utils/fetch'

export default function create () {
  return createStore(
    getRootReducer(),
    composeWithDevTools(
      applyMiddleware(
        thunk
      )
    )
  )
}

const rooms = createReducer<string[], string>('Rooms', { loading: false, data: [] })
const people = createReducer<string[], string>('People', { loading: false, data: [] })

function getRootReducer () {
  return combineReducers({
    rooms,
    people,
    form
  })
}
