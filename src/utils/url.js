function getParams(qureyName) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(qureyName); // URLSearchParams()類別下的方法
}

export const pushSearchParam = (paramKey, param, pathname) => {
  const url = new URL(window.location);
  const searchParams = new URLSearchParams(window.location.search.slice("1"));
  searchParams.has(paramKey) && searchParams.delete(paramKey);
  url.searchParams.set(paramKey, param);
  window.history.pushState({}, "", url);
};
