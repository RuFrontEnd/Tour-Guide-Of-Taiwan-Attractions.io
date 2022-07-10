import { baseURL } from "variable/variable";
import { getAuthorizationHeader } from "variable/auth";
import * as searchParamsUtils from "utils/searchParams";

export const getScenicSpots = (top) => {
  return fetch(`${baseURL}/v2/Tourism/ScenicSpot?${top && `$top=${top}`}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};

export const getCityScenicSpots = (city, top, skip) => {
  const searchParams = searchParamsUtils.getFilterCityApiSearchParams(
    top,
    skip
  );

  return fetch(`${baseURL}/v2/Tourism/ScenicSpot/${city}?$${searchParams}`, {
    headers: getAuthorizationHeader(),
    method: "GET",
  }).then((res) => res.json());
};
