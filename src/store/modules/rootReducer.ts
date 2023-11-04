import { combineReducers } from 'redux';
import authReducer from './auth';
import deleteCardapioReducer from './DeleteCardapio/index';
import updateCardapioReducer from './UpdateCardapio';
import acceptRequestReducer from './AcceptRequest';
import rejectRequestReducer from './RejectRequest';
import updateUserRoleReducer from './Update-user-role';
import deleteUserReducer from './ban-user';
import updateFrequencyReducer from './UpdateFrequency';
import updateStudentReducer from './Update-student/index';
import registerInstituitionReducer from './register-instituition';
import registerUserReducer from './register-user';
export default combineReducers({
  authReducer,
  registerUserReducer,
  deleteCardapioReducer,
  updateCardapioReducer,
  acceptRequestReducer,
  rejectRequestReducer,
  updateUserRoleReducer,
  deleteUserReducer,
  updateFrequencyReducer,
  updateStudentReducer,
  registerInstituitionReducer,
});
