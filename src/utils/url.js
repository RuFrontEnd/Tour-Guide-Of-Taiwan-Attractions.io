function getParams(qureyName) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(qureyName); // URLSearchParams()類別下的方法
}
