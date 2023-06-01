const imgUploadPreview = document.querySelector('.img-upload__preview');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const effects = {
  none: {
    filter: '',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

let currentEffect = 'none';

// Функция для обновления стилей изображения в соответствии с выбранным эффектом и уровнем интенсивности
const updateImageStyle = () => {
  const effect = effects[currentEffect];
  const value = effectLevelSlider.noUiSlider.get();

  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = '';
  } else {
    const filterValue = `${effect.filter}(${value}${effect.unit})`;
    imgUploadPreview.style.filter = filterValue;
  }
};

// Функция для обновления уровня интенсивности эффекта
const updateEffectLevel = (value) => {
  effectLevelValue.value = value;
  updateImageStyle();
};

// Функция для обновления состояния слайдера и стилей изображения при выборе эффекта
const onEffectChange = (evt) => {
  const selectedEffect = evt.target.value;

  currentEffect = selectedEffect;

  if (selectedEffect === 'none') {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }

  imgUploadPreview.className = `img-upload__preview effects__preview--${selectedEffect}`;

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effects[selectedEffect].min,
      max: effects[selectedEffect].max,
    },
    start: effects[selectedEffect].max,
    step: effects[selectedEffect].step,
  });

  updateEffectLevel(effects[selectedEffect].max);
};

// Инициализация слайдера
noUiSlider.create(effectLevelSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
  connect: 'lower',
});

// Обработчик изменения уровня интенсивности слайдера
effectLevelSlider.noUiSlider.on('update', (values, handle) => {
  updateEffectLevel(values[handle]);
});

// Обработчик изменения выбранного эффекта
effectsList.addEventListener('change', onEffectChange);

// Инициализация значений по умолчанию
updateEffectLevel(100);

// Выбор эффекта "Оригинал" по умолчанию при открытии формы
document.querySelector('.effects__radio[value="none"]').checked = true;
effectLevelSlider.classList.add('hidden');
