import { getCreateColorMethod } from "utils/color";

export const mainColor = "#F3F4F6";
export const shallowMainColor = "#F4F5F7";
export const lightReceivingColor = "#ffffff";
export const shadowColor = "#D4DBEA";
export const inputShadowColor = "rgba(255, 255, 255, 0.7)";
export const textColor = "#373A43";
export const placeholderColor = "#ACABB0";
export const navBarColor = "#EAEBED";
export const selectedColor =
  "linear-gradient(180deg, #38D0B7 0%, #35B3EA 100%);";
export const selectedShadowColor = "0px 2px 5px #C0C7D0;";
export const seperateBarColor = "#F1F2F2";
export const optionButtonColor = "#646466";
export const blueGreen = "#38D0B7";
export const notoSans = "'Noto Sans TC', sans-serif";
export const roboto = "'Roboto', sans-serif";

export const __FFF__ = (opacity) =>
  `${opacity ? `rgba(255, 255, 255, ${opacity})` : "#FFF"}`;
export const __0D0B0C__ = (opacity) =>
  `${opacity ? `rgba(13, 11, 12, ${opacity})` : "#0D0B0C"}`;
export const __FF1D6C__ = getCreateColorMethod([255, 29, 108], "#FF1D6C");
export const __ACACAC__ = (opacity) =>
  `${opacity ? `rgba(172, 172, 172, ${opacity})` : "#ACACAC"}`;
export const __007350__ = (opacity) =>
  `${opacity ? `rgba(0, 115, 80, ${opacity})` : "#007350"}`;
export const __FFB72C__ = getCreateColorMethod([255, 183, 44], "#FFB72C");
export const __D2D2D2__ = getCreateColorMethod([210, 210, 210], "#D2D2D2");
