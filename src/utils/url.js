function getParams(qureyName) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(qureyName); // URLSearchParams()類別下的方法
}

export const pushSearchParam = (params) => {
  const url = new URL(window.location);
  const searchParams = new URLSearchParams(window.location.search.slice("1"));
  params.map((param) => {
    searchParams.has(param.key) && searchParams.delete(param.key);
    url.searchParams.set(param.key, param.value);
  });
  window.history.pushState({}, "", url);
};

export const pushSearchParamAndPushUrl = (params, pathName) => {
  const url = new URL(pathName);
  const searchParams = new URLSearchParams(window.location.search.slice("1"));
  params.map((param) => {
    searchParams.has(param.key) && searchParams.delete(param.key);
    url.searchParams.set(param.key, param.value);
  });
  window.location.href = url;
};
