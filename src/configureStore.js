import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './redux/reducers'

const loggerMiddleware = createLogger({
  duration: true,
  diff: true,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}