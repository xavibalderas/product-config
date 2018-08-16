import { createStore, combineReducers } from 'redux'
import { settings, data } from './reducers'

const rootReducer = combineReducers({
  settings,
  data
})

export default createStore(rootReducer)
