import { SHOWNAVBAR } from 'redux/navBar/navBarTypes';

const initialState = {
  showNavBar: true,
  height: 100,
};

const navBarReducers = (state = initialState, action) => {
  switch (action.type) {
    case SHOWNAVBAR:
      return {
        ...state,
        showNavBar: action.showNavBar,
      };

    default:
      return state;
  }
};

export default navBarReducers;
