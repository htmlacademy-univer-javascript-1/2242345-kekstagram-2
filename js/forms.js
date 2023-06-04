import { isEscapeKey } from './util.js';
import './scale-control.js';
import './effects.js';
import { uploadPhoto } from './upload-photo.js';

const uploadFileButton = document.querySelector('#upload-file');
const imgEditingForm = document.querySelector('.img-upload__overlay');
const scaleControl = imgEditingForm.querySelector('.scale__control--value');
const imgUploadPreview = imgEditingForm.querySelector('.img-upload__preview');
const textHashtags = imgEditingForm.querySelector('.text__hashtags');
const textDescription = imgEditingForm.querySelector('.text__description');
const uploadCancelButton = imgEditingForm.querySelector('#upload-cancel');
const effectLevel = document.querySelector('.effect-level');

// Обработчик события нажатия клавиши Escape для закрытия формы
const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeAndResetForm();
  }
};

// Обработчик события нажатия клавиши Escape для снятия фокуса с поля ввода тегов
const onTagsEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    textHashtags.blur();
  }
};

// Обработчик события нажатия клавиши Escape для снятия фокуса с поля ввода описания
const onDescriptionEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    textDescription.blur();
  }
};

// Сбрасывает значения элементов формы
const resetValues = () => {
  document.querySelector('.effects__radio[value="none"]').checked = true;
  effectLevel.classList.add('hidden');
  imgUploadPreview.className = 'img-upload__preview effects__preview--none';
  imgUploadPreview.style.transform = 'scale(1)';
  uploadFileButton.value = '';
  scaleControl.value = '100%';
  imgUploadPreview.style.filter = '';
  textHashtags.value = '';
  textDescription.value = '';
};

// Закрывает форму
const closeFormImg = () => {
  imgEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  textHashtags.removeEventListener('keydown', onTagsEscKeydown);
  textDescription.removeEventListener('keydown', onDescriptionEscKeydown);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

// Открыват форму
const openFormImg = () => {
  imgEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  textHashtags.addEventListener('keydown', onTagsEscKeydown);
  textDescription.addEventListener('keydown', onDescriptionEscKeydown);
  document.addEventListener('keydown', onPopupEscKeydown);
};

// Обработчик события выбора файла для загрузки
const uploadFile = () => {
  uploadPhoto(uploadFileButton);
  openFormImg();
};

uploadFileButton.addEventListener('change', uploadFile);

// Закрывает форму и сбрасывает значения элементов формы
const closeAndResetForm = () => {
  closeFormImg();
  resetValues();
};

uploadCancelButton.addEventListener('click', closeAndResetForm);

export {openFormImg, closeFormImg, closeAndResetForm};
