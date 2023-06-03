import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';


const imgForms = document.querySelector('#upload-select-image');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const submitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(imgForms, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error-text'
});

const re = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

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

pristine.addValidator(textHashtags, validateHashtag, 'Начните с #, используйте только буквы и цифры, не более 20 символов, хэштеги разделяйте пробелом');

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

pristine.addValidator(textHashtags, validateHashtagsUniqueness, 'Не повторяйте теги!');

const validateHashtagsCount = (value) => {
  const tags = value.split(' ');
  return tags.length <= 5;
};

pristine.addValidator(textHashtags, validateHashtagsCount, 'Не более 5 тегов!');

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(textDescription, validateDescription, 'Не более 140 символов!');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setImgFormSubmit = (onSuccess, onFail) => {
  imgForms.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showSuccessMessage();
          unblockSubmitButton();
        },
        () => {
          onFail();
          showErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setImgFormSubmit};
