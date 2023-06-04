import { getRandomIntInclusive, getRandomArrayElement, getRandomIdArray } from './util.js';

const COUNT_PHOTOS = 25; // Количество фотографий, которые нужно сгенерировать
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 1;
const MAX_COUNT_COMMENTS = 15;
const MAX_LENGTH_ID_COMMENTS = COUNT_PHOTOS*MAX_COUNT_COMMENTS;
const AVATAR_COUNT = 6;

const DESCRIPTIONS = [
  'Я на море',
  'Отдыхаю',
  'Вкусно кушаю',
  'Не каждый волк, кто воет',
  'Красивое описание',
  'С котанами',
  'Живу лучшую из 9 жизней',
  'Ауф',
  'Мяу',
  'Моя лучшая фотография',
  'Мама сказала, что я здесь красивый',
]; // Массив с описаниями фотографий

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]; // Массив с сообщениями для комментариев

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
]; // Массив с именами для комментариев

let countCommentsId = 0; // Счетчик для ID комментариев
const commentsId = getRandomIdArray(MAX_LENGTH_ID_COMMENTS); // Массив со случайными ID комментариев

// Создает объект комментария
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomIntInclusive(1, AVATAR_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Создает массив комментариев заданного количества
const createComments = (count) => {
  const comments = [];

  for (let i = countCommentsId; i < countCommentsId + count; i++) {
    comments.push(createComment(commentsId[i]));
  }
  countCommentsId += count;
  return comments;
};

// Создает объект фотографии
const createPhoto = (id, url) => ({
  id,
  url: `photos/${url}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomIntInclusive(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
  comments: createComments(getRandomIntInclusive(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)),
});

// Создает массив фотографий заданного количества
const createPhotos = (count) => {
  const photos = [];
  const photosId = getRandomIdArray(count);
  const url = getRandomIdArray(count);

  for (let i = 0; i < count; i++) {
    photos.push(createPhoto(photosId[i], url[i]));
  }
  return photos;
};

// Генерирует фотографии
const generatePhotos = createPhotos(COUNT_PHOTOS);

export { generatePhotos };
