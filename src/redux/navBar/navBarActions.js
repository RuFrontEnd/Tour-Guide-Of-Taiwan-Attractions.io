import { SHOWNAVBAR } from 'redux/navBar/navBarTypes';

export const showNavBar = (showNavBar) => {
  return {
    type: SHOWNAVBAR,
    info: 'showNavBar',
    showNavBar: showNavBar,
  };
};
