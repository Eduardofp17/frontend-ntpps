import { combineReducers } from 'redux';
import authReducer from './auth';
import registerReducer from './register';
export default combineReducers({
  authReducer,
  registerReducer,
});
