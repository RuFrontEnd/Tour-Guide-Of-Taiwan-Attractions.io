import { baseURL } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";

export const getFoods = (top) => {
  return fetch(`${baseURL}/v2/Tourism/Restaurant?${top && `$top=${top}`}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};

export const getCityFoods = (city, top, skip) => {
  return fetch(
    `${baseURL}/v2/Tourism/Restaurant/${city}?${
      top && `$top=${top}${skip && `&skip=${skip}`}`
    }`,
    {
      headers: getAuthorizationHeader(),
      method: "GET",
    }
  ).then((res) => res.json());
};
