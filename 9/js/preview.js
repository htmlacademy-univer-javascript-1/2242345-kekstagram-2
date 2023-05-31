import { generatePhotos } from './data.js';
import  {openBigPicture} from './photo.js';

const pictures = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarPhotos = generatePhotos;

const similarListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comments, id}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;
  similarListFragment.appendChild(pictureElement);
});

pictures.appendChild(similarListFragment);

const getPhotoData = (id) => {
  let photoData = '';
  similarPhotos.forEach((photo) => {
    if (id === photo.id) {
      photoData = photo;
    }
  });
  return photoData;
};

const onPreviewClick = (evt) => {
  if(evt.target.classList.contains('picture__img')) {
    const photoData = getPhotoData(parseInt(evt.target.parentNode.dataset.id, 10));
    openBigPicture(photoData);
  }
};

pictures.addEventListener('click', onPreviewClick);
