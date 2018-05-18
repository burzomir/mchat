import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as form } from 'redux-form'
import thunk from 'redux-thunk'
import { reducer as data } from './utils/fetch'
import { routerReducer as routing, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { reducer as users } from './users'
import { reducer as spinner } from './ui/components/spinner'

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

function getRootReducer () {
  return combineReducers({
    users,
    data,
    form,
    routing,
    spinner
  })
}
