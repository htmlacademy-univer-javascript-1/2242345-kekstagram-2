import { generatePhotos } from './data.js';

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotos = generatePhotos;

const similarListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comment}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comment.length;
  similarListFragment.appendChild(pictureElement);
});

pictures.appendChild(similarListFragment);

