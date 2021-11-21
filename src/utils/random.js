export function getRandomInt(min, max, usedNumbers = []) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (usedNumbers.length !== 0) {
    for (let i = 0; i < usedNumbers.length; i++) {
      if (number === usedNumbers[i]) {
        return getRandomInt(min, max, usedNumbers);
      }
    }
  }
  return number;
}
