import { generatePhotos } from './data.js';
import  {openBigPicture} from './photo.js';

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotos = generatePhotos;

const similarListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.appendChild(pictureElement);
  pictureElement.addEventListener('click', () => {
    openBigPicture(url, likes, comments, description);
  });
});

pictures.appendChild(similarListFragment);

