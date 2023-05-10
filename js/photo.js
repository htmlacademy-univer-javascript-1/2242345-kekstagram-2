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

const openComments = (comments) => {
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

const openPhoto = (url, likes, comments, description) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  descriptionPhoto.textContent = description;
  commentsCount.textContent = comments.length;
  openComments(comments);
};

const openBigPicture = (url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');
  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  openPhoto(url, likes, comments, description);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeButton.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
});

export {openBigPicture};
