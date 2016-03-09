import { combineReducers } from 'redux';
import authAppState from './auth';

const rootReducer = combineReducers({
  authAppState
});

export default rootReducer;
