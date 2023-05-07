const checkStringLength = (string, maxLength) => string.length <= maxLength;

function getRandomIntInclusive(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomIntInclusive(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

function getRandomIdArray (idPhotos) {
  const generatePhotoId = createRandomIdFromRangeGenerator(1,25);
  for (let i = 0; i < 25; i++) {
    idPhotos.push(generatePhotoId());
  }
  return idPhotos;
}

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length-1)];

export {getRandomIntInclusive, getRandomIdArray, getRandomArrayElement, checkStringLength};
