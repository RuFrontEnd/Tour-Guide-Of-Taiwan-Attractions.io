import { SHOWNAVBAR, SETNAVBARHEIGHT } from "redux/navBar/navBarTypes";

export const showNavBar = (showNavBar) => {
  return {
    type: SHOWNAVBAR,
    info: "showNavBar",
    showNavBar: showNavBar,
  };
};

export const setNavBarHeight = (height) => {
  return {
    type: SETNAVBARHEIGHT,
    info: "setNavBarHeight",
    height: height,
  };
};
