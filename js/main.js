import { renderPreviews } from './preview.js';
import { closeAndResetForm, closeFormImg } from './forms.js';
import { setImgFormSubmit } from './validation-forms.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { showImageFilters } from './filter.js';

// Получение данных с сервера и обработка успешного и неуспешного результатов
getData(
  (previews) => {
    renderPreviews(previews); // Отрисовка превью изображений
    showImageFilters(previews); // Показ фильтров для изображений
  },
  () => showAlert('Не удалось загрузить изображения других пользователей с сервера') // Вывод сообщения об ошибке
);

// Установка обработчика события отправки формы
setImgFormSubmit(closeAndResetForm, closeFormImg);
