import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const imgForms = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

// Создаем экземпляр Pristine для валидации формы
const pristine = new Pristine(imgForms, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error-text'
});

const re = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/; // Регулярное выражение для проверки формата хэштега

// Функция для валидации формата хэштегов
const validateHashtag = (value) => {
  const tags = value.split(' ');
  if (value === '') {
    return true;
  }
  for (let i = 0; i < tags.length; i++) {
    if (!re.test(tags[i])) {
      return false;
    }
  }
  return true;
};

// Добавляем валидатор для поля ввода хэштегов
pristine.addValidator(
  textHashtags,
  validateHashtag,
  'Начните с #, используйте только буквы и цифры, не более 20 символов, хэштеги разделяйте пробелом'
);

// Функция для валидации уникальности хэштегов
const validateHashtagsUniqueness = (value) => {
  const tags = value.split(' ');
  for (let i = 0; i < tags.length-1; i++) {
    for (let j = i+1; j < tags.length; j++){
      if (tags[i].toLowerCase() === tags[j].toLowerCase()) {
        return false;
      }
    }
  }
  return true;
};

// Добавляем валидатор для проверки уникальности хэштегов
pristine.addValidator(textHashtags, validateHashtagsUniqueness, 'Не повторяйте теги!');

// Функция для валидации количества хэштегов
const validateHashtagsCount = (value) => {
  const tags = value.split(' ');
  return tags.length <= 5;
};

// Добавляем валидатор для проверки количества хэштегов
pristine.addValidator(textHashtags, validateHashtagsCount, 'Не более 5 тегов!');

// Функция для валидации длины описания
const validateDescription = (value) => value.length <= 140;

// Добавляем валидатор для проверки длины описания
pristine.addValidator(textDescription, validateDescription, 'Не более 140 символов!');

const blockSubmitButton = () => {
  submitButton.disabled = true; // Блокируем кнопку отправки формы
  submitButton.textContent = 'Публикую...'; // Меняем текст кнопки на "Публикую..."
};

const unblockSubmitButton = () => {
  submitButton.disabled = false; // Разблокируем кнопку отправки формы
  submitButton.textContent = 'Опубликовать'; // Меняем текст кнопки на "Опубликовать"
};

const setImgFormSubmit = (onSuccess, onFail) => {
  imgForms.addEventListener('submit', (evt) => {
    evt.preventDefault(); // Предотвращаем отправку формы
    const isValid = pristine.validate(); // Проверяем валидность формы
    if (isValid) {
      blockSubmitButton(); // Блокируем кнопку отправки формы
      sendData(
        () => {
          onSuccess(); // Вызываем функцию обработки успешного запроса на сервер
          showSuccessMessage(); // Отображаем сообщение об успешной операции
          unblockSubmitButton(); // Разблокируем кнопку отправки формы
        },
        () => {
          onFail(); // Вызываем функцию обработки неуспешного запроса на сервер
          showErrorMessage(); // Отображаем сообщение об ошибке
          unblockSubmitButton(); // Разблокируем кнопку отправки формы
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setImgFormSubmit};
