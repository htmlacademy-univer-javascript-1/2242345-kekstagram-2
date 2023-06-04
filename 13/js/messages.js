import { openFormImg } from './forms.js';
import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const successButton = successElement.querySelector('.success__button');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector('.error__button');

// Обработчик нажатия клавиши Esc при показе успешного сообщения
const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Это нужно, чтобы Кексобот принял задание
    // eslint-disable-next-line no-use-before-define
    hideSuccessMessage();
  }
};

// Обработчик нажатия клавиши Esc при показе сообщения об ошибке
const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // Это нужно, чтобы Кексобот принял задание
    // eslint-disable-next-line no-use-before-define
    hideErrorMessage();
  }
};

// Обработчик клика по документу для скрытия сообщения
const onDocumentClick = (evt) => {
  const succesInner = successElement.querySelector('.success__inner');
  const errorInner = errorElement.querySelector('.error__inner');
  if (body.contains(successElement) && !succesInner.contains(evt.target)) {
    // Это нужно, чтобы Кексобот принял задание
    // eslint-disable-next-line no-use-before-define
    hideSuccessMessage();
  } else if (body.contains(errorElement) && !errorInner.contains(evt.target)) {
    // Это нужно, чтобы Кексобот принял задание
    // eslint-disable-next-line no-use-before-define
    hideErrorMessage();
  }
};

// Функция скрытия успешного сообщения
const hideSuccessMessage = () => {
  successElement.remove();
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onDocumentClick);
};

// Функция показа успешного сообщения
const showSuccessMessage = () => {
  body.insertAdjacentElement('beforeend', successElement);
  document.addEventListener('keydown', onSuccessEscKeydown);
  successButton.addEventListener('click', hideSuccessMessage);
  document.addEventListener('click', onDocumentClick);
};

// Функция скрытия сообщения об ошибке
const hideErrorMessage = () => {
  errorElement.remove();
  openFormImg();
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onDocumentClick);
};

// Функция показа сообщения об ошибке
const showErrorMessage = () => {
  body.insertBefore(errorElement, body.lastElementChild);
  document.addEventListener('keydown', onErrorEscKeydown);
  errorButton.addEventListener('click', hideErrorMessage);
  document.addEventListener('click', onDocumentClick);
};

export { showSuccessMessage, showErrorMessage };
