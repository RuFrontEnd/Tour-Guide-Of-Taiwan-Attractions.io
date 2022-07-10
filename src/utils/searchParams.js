const getFilterCityApiSearchParams = (_top, _skip) => {
  const searchParams = new URLSearchParams();
  if (_top) {
    searchParams.append("top", _top);
  }
  if (_skip) {
    searchParams.append("skip", _skip);
  }

  return searchParams;
};

export { getFilterCityApiSearchParams };
