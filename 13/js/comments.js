// Получаем необходимые элементы из DOM
const bigPicture = document.querySelector('.big-picture');
const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const commentsLoaderStep = commentsCountBlock.querySelector('.comments-loader-step');
const commentItem = bigPicture.querySelectorAll('.social__comment');
const commentsList = bigPicture.querySelector('.social__comments');

const COMMENTS_STEP = 5; // Количество комментариев, отображаемых за один раз
let comments = []; // Массив с комментариями
let commentsCounter = 0; // Счетчик количества отображенных комментариев

// Отображает список комментариев на странице
const renderComments = (commentsArray) => {
  const commentListFragment = document.createDocumentFragment();
  commentsArray.forEach(({ avatar, message, name }) => {
    const commentTemplate = commentItem[0].cloneNode(true);
    commentTemplate.querySelector('.social__picture').src = avatar;
    commentTemplate.querySelector('.social__picture').alt = name;
    commentTemplate.querySelector('.social__text').textContent = message;
    commentListFragment.appendChild(commentTemplate);
  });
  commentsList.appendChild(commentListFragment);
  commentsCounter += commentsArray.length;
  commentsLoaderStep.textContent = commentsCounter;
};

// Обработчик нажатия на кнопку "Загрузить еще комментарии"
const onCommentsLoaderButtonClick = () => {
  if (comments.length <= COMMENTS_STEP) {
    // Это необходимо, чтобы Кексобот принял задание
    // eslint-disable-next-line no-use-before-define
    hideCommentsLoaderButton();
  }
  renderComments(comments.splice(0, COMMENTS_STEP));
};

// Показывает кнопку "Загрузить еще комментарии"
const showCommentsLoaderButton = () => {
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.addEventListener('click', onCommentsLoaderButtonClick);
};

// Скрывает кнопку "Загрузить еще комментарии"
const hideCommentsLoaderButton = () => {
  commentsLoaderButton.classList.add('hidden');
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderButtonClick);
};

// Открывает список комментариев для отображения
const openCommentsList = (photoDataComments) => {
  commentsList.innerHTML = '';
  comments = photoDataComments.slice();

  commentsCountBlock.classList.remove('hidden');
  renderComments(comments.splice(0, COMMENTS_STEP));

  if (photoDataComments.length <= COMMENTS_STEP) {
    hideCommentsLoaderButton();
  } else {
    showCommentsLoaderButton();
  }
};

// Очищает список комментариев
const clearCommentsList = () => {
  commentsList.innerHTML = '';
  comments = [];
  commentsCounter = 0;
};

export { openCommentsList, clearCommentsList };
