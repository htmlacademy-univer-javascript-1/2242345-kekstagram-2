const ALERT_SHOW_TIME = 5000;

// Проверка длины строки
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Генерация случайного целого числа включительно в заданном диапазоне
const getRandomIntInclusive = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Генератор случайного уникального идентификатора в заданном диапазоне
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomIntInclusive(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// Генерация массива случайных уникальных идентификаторов в заданном диапазоне
const getRandomIdArray = (length) => {
  const idArray = [];
  const generateId = createRandomIdFromRangeGenerator(0, length - 1);
  for (let i = 0; i < length; i++) {
    idArray.push(generateId());
  }
  return idArray;
};

// Получение случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

// Получение нового массива с элементами в случайном порядке
const getRandomArray = (array) => {
  const idArray = getRandomIdArray(array.length);
  const newArray = [];
  for (let i = 0; i < idArray.length; i++) {
    newArray.push(array[idArray[i]]);
  }
  return newArray;
};

// Проверка, является ли нажатая клавиша Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Отображение всплывающего сообщения на указанное время
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#e01010';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция для задержки выполнения колбэка
const debounce = (callback, timeoutDelay) => {
  // Используем замыкание, чтобы id таймаута сохранялось между вызовами функции
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом функции удаляем предыдущий таймаут,
    // чтобы избежать накопления множества задержек
    clearTimeout(timeoutId);

    // Устанавливаем новый таймаут с вызовом колбэка после заданной задержки
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом, цикл «установить таймаут - удалить таймаут» будет продолжаться,
    // пока вызовы функции происходят чаще, чем указанная задержка timeoutDelay
  };
};

export {
  getRandomIntInclusive,
  getRandomIdArray,
  getRandomArrayElement,
  getRandomArray,
  checkStringLength,
  isEscapeKey,
  showAlert,
  debounce
};
