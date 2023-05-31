import { getRandomArrayElement } from '../utils/common.js';
import { TYPES } from '../const.js';
import { nanoid } from 'nanoid';

export const points = [
  {
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:00:00.845Z',
    'dateTo': '2019-07-11T11:20:50.375Z',
    'destination': 3,
    'isFavorite': false,
    'offers': [1],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 2100,
    'dateFrom': '2020-07-12T12:50:00.845Z',
    'dateTo': '2020-07-12T14:20:50.375Z',
    'destination': 2,
    'isFavorite': true,
    'offers': [1, 2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 3100,
    'dateFrom': '2021-07-14T21:50:00.845Z',
    'dateTo': '2021-07-15T12:20:50.375Z',
    'destination': 1,
    'isFavorite': true,
    'offers': [1],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 2100,
    'dateFrom': '2022-07-12T12:50:00.845Z',
    'dateTo': '2022-07-12T14:20:50.375Z',
    'destination': 2,
    'isFavorite': true,
    'offers': [1, 2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 4120,
    'dateFrom': '2021-07-12T12:50:00.845Z',
    'dateTo': '2021-07-12T14:20:50.375Z',
    'destination': 1,
    'isFavorite': true,
    'offers': [1, 2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 2510,
    'dateFrom': '2023-07-12T12:50:00.845Z',
    'dateTo': '2023-07-12T14:20:50.375Z',
    'destination': 3,
    'isFavorite': true,
    'offers': [1, 2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 2500,
    'dateFrom': '2020-07-12T12:50:00.845Z',
    'dateTo': '2020-07-12T14:20:50.375Z',
    'destination': 1,
    'isFavorite': true,
    'offers': [1, 2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'basePrice': 2500,
    'dateFrom': '2021-07-12T12:50:00.845Z',
    'dateTo': '2021-07-12T14:20:50.375Z',
    'destination': 2,
    'isFavorite': true,
    'offers': [1, 2],
    'type': getRandomArrayElement(TYPES)
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points)
  };
}

export { getRandomPoint };
