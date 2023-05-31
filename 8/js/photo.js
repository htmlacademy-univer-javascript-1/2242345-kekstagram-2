import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const descriptionPhoto = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelectorAll('.social__comment');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const openCommentsList = (comments) => {
  commentsList.innerHTML = '';
  const commentListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name}) => {
    const commentTemplate = commentItem[0].cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = avatar;
    commentTemplate.querySelector('.social__picture').alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    commentListFragment.appendChild(commentTemplate);
  });
  commentsList.appendChild(commentListFragment);
};

const openPhoto = (photoData) => {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  descriptionPhoto.textContent = photoData.description;
  commentsCount.textContent = photoData.comments.length;
  openCommentsList(photoData.comments);
};

const clearCommentsList = () => {
  commentsList.innerHTML = '';
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearCommentsList();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openBigPicture = (photoData) => {
  bigPicture.classList.remove('hidden');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  openPhoto(photoData);
  document.addEventListener('keydown', onPopupEscKeydown);
};

closeButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
