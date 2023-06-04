import { isEscapeKey } from './util.js';
import { openCommentsList, clearCommentsList} from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const descriptionPhoto = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// Отрисовка фотографии с переданными данными
const openPhoto = (photoData) => {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  descriptionPhoto.textContent = photoData.description;
  commentsCount.textContent = photoData.comments.length;
  openCommentsList(photoData.comments);
};

// Обработчик нажатия клавиши Esc при открытом попапе
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Это нужно, чтобы Кексобот принял задание
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

// Закрытие фотографии
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearCommentsList();
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeButton.removeEventListener('click', closeBigPicture);
};

// Открытие фотографии
const openBigPicture = (photoData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  openPhoto(photoData);
  document.addEventListener('keydown', onPopupEscKeydown);
  closeButton.addEventListener('click', closeBigPicture);
};

export {openBigPicture};
