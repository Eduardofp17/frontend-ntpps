import { combineReducers } from 'redux';
import authReducer from './auth';
import registerReducer from './register';
import deleteCardapioReducer from './DeleteCardapio/index';
import updateCardapioReducer from './UpdateCardapio';
export default combineReducers({
  authReducer,
  registerReducer,
  deleteCardapioReducer,
  updateCardapioReducer,
});
