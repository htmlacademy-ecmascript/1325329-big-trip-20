import { getRandomArrayElement } from '../utils.js';
import { TYPES } from '../const.js';

export const points = [
  {
    'id': 1,
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': 1,
    'isFavorite': false,
    'offers': [1,2,3],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'id': 2,
    'basePrice': 2100,
    'dateFrom': '2020-07-11T12:55:56.845Z',
    'dateTo': '2020-07-12T14:22:13.375Z',
    'destination': 2,
    'isFavorite': false,
    'offers': [1,2],
    'type': getRandomArrayElement(TYPES)
  },
  {
    'id': 3,
    'basePrice': 3100,
    'dateFrom': '2021-07-14T21:55:56.845Z',
    'dateTo': '2021-07-15T12:22:13.375Z',
    'destination': 2,
    'isFavorite': true,
    'offers': [1],
    'type': getRandomArrayElement(TYPES)
  }
];

function getRandomPoint() {
  return getRandomArrayElement(points);
}

export { getRandomPoint };
