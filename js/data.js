import { getRandomIntInclusive, getRandomArrayElement, getRandomIdArray, checkStringLength } from './util.js';

const COUNT_PHOTOS = 25; // Количество фотографий, которые нужно сгенерировать

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
const commentsId = getRandomIdArray(100); // Массив со случайными ID комментариев

// Создает объект комментария
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
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
  likes: getRandomIntInclusive(15, 200),
  comments: createComments(getRandomIntInclusive(1, 15)),
});

// Создает массив фотографий заданного количества
const createPhotos = (count) => {
  const PHOTOS = [];
  const photosId = getRandomIdArray(25);
  const url = getRandomIdArray(25);

  for (let i = 0; i < count; i++) {
    PHOTOS.push(createPhoto(photosId[i], url[i]));
  }
  return PHOTOS;
};

// Проверка длины строки
checkStringLength('sdfgh', 10);

// Генерирует фотографии
const generatePhotos = createPhotos(COUNT_PHOTOS);

export { generatePhotos };
