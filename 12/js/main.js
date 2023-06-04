import { renderPreviews } from './preview.js';
import { closeAndResetForm, closeFormImg } from './forms.js';
import { setImgFormSubmit } from './validation-forms.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { showImageFilters } from './filter.js';

getData(
  (previews) => {
    renderPreviews(previews);
    showImageFilters(previews);
  },
  () => showAlert('Не удалось загрузить изображения других пользователей с сервера')
);

setImgFormSubmit(closeAndResetForm, closeFormImg);
