import { fixNumber } from "utils/number";

export const getLocation = (handleLocation) =>
  new Promise((resolve) => {
    // navigator.geolocation.getCurrentPosition()為非同步
    navigator.geolocation.getCurrentPosition((position) => {
      const _latitude = fixNumber(position.coords.latitude, 1);
      const _longitude = fixNumber(position.coords.longitude, 1);
      const _resolve = {
        longitude: _longitude,
        latitude: _latitude,
      };
      resolve(_resolve);
    });
  }).then((res) => handleLocation(res));
