import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'
import { createReducer } from './utils/fetch'
import { routerReducer as routing, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

export const create = () => {
  return createStore(
    getRootReducer(),
    composeWithDevTools(
      applyMiddleware(
        thunk,
        routerMiddleware(history)
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
    form,
    routing
  })
}
