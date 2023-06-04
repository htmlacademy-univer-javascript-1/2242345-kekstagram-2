const MIN_SCALE_VALUES = 0.25;
const SCALE_STEP = 0.25;

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let scaleValue = 1; // Значение масштаба по умолчанию

// Обновление значения и применение масштаба
const updateScale = () => {
  const scalePercentage = `${scaleValue * 100}%`;
  scaleControlValue.value = scalePercentage;
  imgUploadPreview.style.transform = `scale(${scaleValue})`;
};

// Уменьшение масштаба
const decreaseScale = () => {
  if (scaleValue > MIN_SCALE_VALUES) {
    scaleValue -= SCALE_STEP;
    updateScale();
  }
};

// Увеличение масштаба
const increaseScale = () => {
  if (scaleValue < 1) {
    scaleValue += SCALE_STEP;
    updateScale();
  }
};

// Добавление обработчиков событий на кнопки уменьшения и увеличения масштаба
scaleControlSmaller.addEventListener('click', decreaseScale);
scaleControlBigger.addEventListener('click', increaseScale);
