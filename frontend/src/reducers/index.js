import { combineReducers } from 'redux';
import { alert } from './AlertReducer';
import { userPage } from './UserPageReducer';

export default combineReducers({
  alert,
  userPage,
});
