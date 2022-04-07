import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user/reducer';

const globalReducer = (history) => combineReducers({
  router: connectRouter(history),
  userReducer,
});

export default globalReducer;
