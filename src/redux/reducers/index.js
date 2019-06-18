import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const reducer = combineReducers({
  user: authReducer,
  tasks: taskReducer,
  errors: errorReducer
});

export default reducer;
