import { combineReducers } from 'redux';
import authReducer from './auth';
import registerReducer from './register';
import deleteCardapioReducer from './DeleteCardapio/index';
import updateCardapioReducer from './UpdateCardapio';
import acceptRequestReducer from './AcceptRequest';
import rejectRequestReducer from './RejectRequest';
import updateUserRoleReducer from './Update-user-role';
import deleteUserReducer from './ban-user';

export default combineReducers({
  authReducer,
  registerReducer,
  deleteCardapioReducer,
  updateCardapioReducer,
  acceptRequestReducer,
  rejectRequestReducer,
  updateUserRoleReducer,
  deleteUserReducer,
});
