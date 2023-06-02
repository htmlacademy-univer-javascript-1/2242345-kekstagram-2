import { isEscapeKey } from './util.js';
import './validation-forms.js';
import './scale-control.js';
import './effects.js';

const uploadFileButton = document.querySelector('#upload-file');
const imgEditingForm = document.querySelector('.img-upload__overlay');
const scaleControl = imgEditingForm.querySelector('.scale__control--value');
const uploadImg = imgEditingForm.querySelector('.img-upload__preview img');
const effectLevelValue = imgEditingForm.querySelector('.effect-level__value');
const filterEffectNone = imgEditingForm.querySelector('#effect-none');
const textHashtags = imgEditingForm.querySelector('.text__hashtags');
const textDescription = imgEditingForm.querySelector('.text__description');
const uploadCancelButton = imgEditingForm.querySelector('#upload-cancel');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUploadForm();
  }
};

const onTagsEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    textHashtags.blur();
  }
};

const onDescriptionEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
    textDescription.blur();
  }
};

const resetValues = () => {
  uploadFileButton.value = '';
  scaleControl.value = '100%';
  uploadImg.src = '';
  effectLevelValue.value = '';
  filterEffectNone.setAttribute('checked', 'true');
  textHashtags.value = '';
  textDescription.value = '';
};

const closeUploadForm = () => {
  imgEditingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetValues();
  textHashtags.removeEventListener('keydown', onTagsEscKeydown);
  textDescription.removeEventListener('keydown', onDescriptionEscKeydown);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const openFormImg = () => {
  imgEditingForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  textHashtags.addEventListener('keydown', onTagsEscKeydown);
  textDescription.addEventListener('keydown', onDescriptionEscKeydown);
  document.addEventListener('keydown', onPopupEscKeydown);
};

uploadFileButton.addEventListener('change', openFormImg);

uploadCancelButton.addEventListener('click', closeUploadForm);
