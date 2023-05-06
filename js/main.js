const DESCRIPTIONS = [
  'Я на море',
  'Отдыхаю',
  'Вкусно кушаю',
  'Не каждый волк, кто воет',
  'Красивое описание',
  'С котанами',
  'Живу лучшую из 9 жизней',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Мишаня',
  'Софа',
  'Киборг Убийца',
  'Мафиозник',
  'Николя',
  'Санек',
  'Иришка',
  'Люций',
  'Костян',
  'Роман',
  'Кира',
];

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

function getIdArray (idPhotos) {
  const generatePhotoId = createRandomIdFromRangeGenerator(1,25);
  for (let i = 0; i < 25; i++) {
    idPhotos.push(generatePhotoId());
  }
  return idPhotos;
}

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length-1)];

const createPhoto = (id) => ({
  id,
  url: `photos/${  id  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(15, 200),
  comment: {
    id,
    avatar: `img/avatar-${  getRandomIntInclusive(1,6)  }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  },
});

const createPhotos = (count) => {
  const PHOTOS = [];
  const idPhotos = [];
  for (let i = 0; i < count; i++) {
    PHOTOS.push(createPhoto(getIdArray(idPhotos)[i]));
  }
  return PHOTOS;
};

createPhotos(25);

checkStringLength('sdfgh', 10);
