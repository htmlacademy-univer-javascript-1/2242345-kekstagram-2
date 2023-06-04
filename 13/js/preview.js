import { openBigPicture } from './photo.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Создание пустого массива для хранения данных фотографий
let photos = [];

// Рендеринг превью фотографий
const renderPreviews = (similarPhotos) => {
  photos = similarPhotos;
  const similarListFragment = document.createDocumentFragment();

  similarPhotos.forEach(({ url, likes, comments, id }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.id = id;
    similarListFragment.appendChild(pictureElement);
  });

  pictures.appendChild(similarListFragment);
};

// Обработчик клика на превью фотографии
const onPreviewClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    const id = parseInt(pictureElement.dataset.id, 10);
    const photoData = photos.find((photo) => photo.id === id);
    if (photoData) {
      openBigPicture(photoData);
    }
  }
};

// Добавление обработчика клика на превью фотографий
pictures.addEventListener('click', onPreviewClick);

export { renderPreviews };
