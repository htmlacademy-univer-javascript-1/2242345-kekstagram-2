const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview');

let scaleValue = 1; // Значение масштаба по умолчанию

const updateScale = () => {
  const scalePercentage = `${scaleValue * 100  }%`;
  scaleControlValue.value = scalePercentage;
  imgUploadPreview.style.transform = `scale(${scaleValue})`;
};

const decreaseScale = () => {
  if (scaleValue > 0.25) {
    scaleValue -= 0.25;
    updateScale();
  }
};

const increaseScale = () => {
  if (scaleValue < 1) {
    scaleValue += 0.25;
    updateScale();
  }
};

scaleControlSmaller.addEventListener('click', decreaseScale);
scaleControlBigger.addEventListener('click', increaseScale);
