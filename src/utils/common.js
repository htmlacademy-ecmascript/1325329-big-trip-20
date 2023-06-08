const getRandomValue = (max) => Math.floor(Math.random() * max);

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export { getRandomArrayElement, getRandomValue, getRandomInteger };
