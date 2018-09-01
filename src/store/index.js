import { createStore, combineReducers } from 'redux'
import { settings, data } from './reducers'

const reducers = {
  settings,
  data,
}
const rootReducer = combineReducers(reducers)

export default createStore(rootReducer)
