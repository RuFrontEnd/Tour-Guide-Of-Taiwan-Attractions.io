const searchItems = (_pathName, keyword, categories, city, history) => {
  const searchParams = new URLSearchParams();
  if (keyword) {
    searchParams.append("keyword", keyword);
  }
  if (categories) {
    searchParams.append("category", categories);
  }
  if (city) {
    searchParams.append("city", city);
  }
  const _search = searchParams.toString();
  history.push({
    pathname: _pathName,
    search: _search,
  });
};

export { searchItems };
