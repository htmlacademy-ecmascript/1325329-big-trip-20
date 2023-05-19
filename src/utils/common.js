const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomValue = (max) => Math.floor(Math.random() * max);

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export { getRandomArrayElement, getRandomValue, getRandomInteger, updateItem };
