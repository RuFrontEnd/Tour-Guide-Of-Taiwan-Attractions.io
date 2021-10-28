import { combineReducers } from 'redux';
import memberReducer from 'redux/member/memberReducers';
import navBarReducer from 'redux/navBar/navBarReducers';

const rootReducer = combineReducers({
  member: memberReducer,
  navBar: navBarReducer,
});

export default rootReducer;
