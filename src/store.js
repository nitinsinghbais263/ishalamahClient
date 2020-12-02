import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import axios from 'axios'
import rootReducer from '../reducers'
import { config } from '../config'

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  axios.defaults.baseURL = config.API_BASE_URL
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))
  return store
}

export default configureStore
