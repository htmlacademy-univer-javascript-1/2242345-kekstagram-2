import { getRandomIntInclusive, getRandomArrayElement, getRandomIdArray, checkStringLength } from './util.js';

const COUNT_PHOTOS = 25;

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

const createComment = (id) => ({
  id,
  avatar: `img/avatar-${  getRandomIntInclusive(1,6)  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createComments = (count) => {
  const comments =[];
  const idComments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment(getRandomIdArray(idComments, 1000)[i]));
  }
  return comments;
};

const createPhoto = (id) => ({
  id,
  url: `photos/${  id  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(15, 200),
  comment: createComments(getRandomIntInclusive(1,4)),
});

const createPhotos = (count) => {
  const PHOTOS = [];
  const idPhotos = [];
  for (let i = 0; i < count; i++) {
    PHOTOS.push(createPhoto(getRandomIdArray(idPhotos, COUNT_PHOTOS)[i]));
  }
  return PHOTOS;
};

checkStringLength('sdfgh', 10);

const generatePhotos = createPhotos(COUNT_PHOTOS);

export {generatePhotos};
