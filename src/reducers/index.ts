import { combineReducers } from 'redux';
import authState from './auth';

const rootReducer = combineReducers({
  authState
});

export default rootReducer;
