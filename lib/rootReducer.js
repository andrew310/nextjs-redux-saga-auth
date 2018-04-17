// lib/rootReducer
import { combineReducers } from 'redux';

import { login } from './auth/reducers';

export default combineReducers({
  login,
});
