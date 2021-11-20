import { baseURL } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";

export const getScenicSpots = (top) => {
  return fetch(`${baseURL}/v2/Tourism/ScenicSpot?${top && `$top=${top}`}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};

export const getCityScenicSpots = (city, top) => {
  return fetch(
    `${baseURL}/v2/Tourism/ScenicSpot/${city}?${top && `$top=${top}`}`,
    {
      headers: getAuthorizationHeader(),
      method: "GET",
    }
  ).then((res) => res.json());
};
