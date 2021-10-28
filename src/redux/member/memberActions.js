import {
  LOGIN,
  LOGOUT,
  SETCURRENTUSER,
  SETCURRENTUSERDATA,
} from 'redux/member/memberTypes';

export const login = () => {
  return {
    type: LOGIN,
    info: 'login status has been changed(true)',
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    info: 'login status has been changed(false)',
  };
};

export const setCurrentUser = (currentUser) => {
  return {
    type: SETCURRENTUSER,
    info: 'currnetUser status has been changed',
    currentUser: currentUser,
  };
};

export const setCurrentUserData = (currentUserData) => {
  return {
    type: SETCURRENTUSERDATA,
    info: 'currnetUserData status has been changed',
    currentUserData: currentUserData,
  };
};
