export function getRandomInt(min, max, usedNumbers) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  if (usedNumbers) {
    for (let i = 0; i < usedNumbers.length; i++) {
      if (number === usedNumbers[i]) {
        return getRandomInt();
      }
    }
  }
  return number;
}
