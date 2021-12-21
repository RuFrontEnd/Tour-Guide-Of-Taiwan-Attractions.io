import { baseURL } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";

export const getHotels = (top) => {
  return fetch(`${baseURL}/v2/Tourism/Hotel?${top && `$top=${top}`}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};

export const getCityHotels = (city, top, skip) => {
  return fetch(
    `${baseURL}/v2/Tourism/Hotel/${city}?${
      top && `$top=${top}${skip && `&skip=${skip}`}`
    }`,
    {
      headers: getAuthorizationHeader(),
      method: "GET",
    }
  ).then((res) => res.json());
};
