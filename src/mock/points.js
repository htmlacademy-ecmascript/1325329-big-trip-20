import { getRandomArrayElement } from '../utils.js';
import { TYPES } from '../const.js';

export const points = [
  {
    'id': 1,
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:00:00.845Z',
    'dateTo': '2019-07-11T11:20:50.375Z',
    'destination': 3,
    'isFavorite': false,
    'offers': [1],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'id': 2,
    'basePrice': 2100,
    'dateFrom': '2020-07-12T12:50:00.845Z',
    'dateTo': '2020-07-12T14:20:50.375Z',
    'destination': 2,
    'isFavorite': true,
    'offers': [1,2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'id': 3,
    'basePrice': 3100,
    'dateFrom': '2021-07-14T21:50:00.845Z',
    'dateTo': '2021-07-15T12:20:50.375Z',
    'destination': 1,
    'isFavorite': true,
    'offers': [1],
    'type': getRandomArrayElement(TYPES)
  }
];

function getRandomPoint() {
  return getRandomArrayElement(points);
}

export { getRandomPoint };
