export const removeRepeatedValue = (numbers) => {
  const filteredArray = numbers.filter((number, index, arr) => {
    return arr.indexOf(number) === index; // indexOf(value) 預設回傳第一個value的索引值, 如果要找到第N個出現的 => arr.indexOf(value, N)
  });
  return filteredArray;
};
