import { baseURL } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";
import * as searchParamsUtils from "utils/searchParams";

export const getActivities = (top) => {
  return fetch(`${baseURL}/v2/Tourism/Activity?${top && `$top=${top}`}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};

export const getCityActivities = (city, top, skip) => {
  const searchParams = searchParamsUtils.getFilterCityApiSearchParams(
    top,
    skip
  );

  return fetch(`${baseURL}/v2/Tourism/Activity/${city}?$${searchParams}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};
