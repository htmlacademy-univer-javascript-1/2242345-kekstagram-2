import { renderPreviews } from './preview.js';
import { getRandomArray, debounce} from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_FILTER_COUNT = 10;

const imgFiltersElement = document.querySelector('.img-filters');
let photos = [];
let isRendering = false;

// Функция обновления списка элементов в соответствии с выбранным фильтром
function updateFilteredItems(filterId) {
  // Проверка на рендер изображений предотвратит отрисовку сразу нескольких списков при быстром клике
  if (isRendering) {
    return;
  }

  const previews = document.querySelectorAll('.picture');

  // Очищаем страницу от старых превью перед добавлением новых элементов
  previews.forEach((preview) => {
    preview.remove();
  });

  let filteredPreviews;

  if (filterId === 'filter-default') {
    // Фотографии в изначальном порядке с сервера
    filteredPreviews = photos;
  } else if (filterId === 'filter-random') {
    // 10 случайных, не повторяющихся фотографий
    filteredPreviews = getRandomArray(photos).slice(0, RANDOM_FILTER_COUNT);
  } else if (filterId === 'filter-discussed') {
    // Фотографии, отсортированные в порядке убывания количества комментариев
    filteredPreviews = [...photos].sort((a, b) => {
      const aComments = a.comments.length;
      const bComments = b.comments.length;
      return bComments - aComments;
    });
  }

  // Отрисуем новый массив с задержкой
  isRendering = true;
  debounce(() => {
    renderPreviews(filteredPreviews);
    isRendering = false;
  }, RERENDER_DELAY)();
}

// Функция для обработки изменения фильтров
function handleFilterChange(evt) {
  const filterButtons = document.querySelectorAll('.img-filters__button');
  filterButtons.forEach((button) => {
    if(button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  });
  evt.target.classList.add('img-filters__button--active');

  updateFilteredItems(evt.target.id); // Передаем ID выбранного фильтра
}

const onFilterClick = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    handleFilterChange(evt);
  }
};

// Функция для показа блока .img-filters
const showImageFilters = (previews) => {
  photos = previews;
  imgFiltersElement.classList.remove('img-filters--inactive');
  imgFiltersElement.addEventListener('click', onFilterClick);
};

export { showImageFilters };
