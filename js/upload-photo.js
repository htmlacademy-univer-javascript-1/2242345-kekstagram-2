// Массив разрешенных типов файлов
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

// Превью изображения
const imgUploadPreview = document.querySelector('.img-upload__preview img');

// Функция загрузки фото
const uploadPhoto = (fileChooser) => {
  const file = fileChooser.files[0]; // Получение выбранного файла
  const fileName = file.name.toLowerCase(); // Приведение имени файла к нижнему регистру

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)); // Проверка соответствия типа файла разрешенным типам

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file); // Установка пути превью изображения
  }
};

export { uploadPhoto };
