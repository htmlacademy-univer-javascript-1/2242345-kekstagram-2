function getRandomIntInclusive(min, max) {
  if (min > -1 && max > -1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
}

const checkTheLengthOfTheString = (verifiableString, maxLength) => verifiableString.length < maxLength + 1;
