import jsSHA from "jssha";

export const getAuthorizationHeader = () => {
  let AppID = "d8a00188d8fc4814922181ed65fc12dd";
  let AppKey = "GsShW2xteF4icnz9hwAWrMNRQFQ";
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
};
