import { createStore, applyMiddleware, combineReducers, Reducer } from 'redux'
import thunkMiddleware from "./middleware/thunkMiddleware"

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

export default function createStore(reducer: Reducer, initialState: Object) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
