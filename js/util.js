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

function getRandomIdArray (length) {
  const idArray = [];
  const generateId = createRandomIdFromRangeGenerator(1,length);
  for (let i = 0; i < length; i++) {
    idArray.push(generateId());
  }
  return idArray;
}

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length-1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomIntInclusive, getRandomIdArray, getRandomArrayElement, checkStringLength, isEscapeKey};
