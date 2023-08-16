import { combineReducers } from 'redux';
import authReducer from './auth';
import registerReducer from './register';
import deleteCardapioReducer from './DeleteCardapio/index';
import updateCardapioReducer from './UpdateCardapio';
import acceptRequestReducer from './AcceptRequest';
import rejectRequestReducer from './RejectRequest';
import updateUserRoleReducer from './Update-user-role';

export default combineReducers({
  authReducer,
  registerReducer,
  deleteCardapioReducer,
  updateCardapioReducer,
  acceptRequestReducer,
  rejectRequestReducer,
  updateUserRoleReducer,
});
