import { baseURL } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";

export const getActivities = (top) => {
  return fetch(`${baseURL}/v2/Tourism/Activity?${top && `$top=${top}`}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};

export const getActivitiesSpots = (city, top) => {
  return fetch(
    `${baseURL}/v2/Tourism/Activity/${city}?${top && `$top=${top}`}`,
    {
      headers: getAuthorizationHeader(),
      method: "GET",
    }
  ).then((res) => res.json());
};
