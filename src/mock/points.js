import { getRandomArrayElement } from '../utils.js';
import { TYPES } from '../const.js';

const destinations = [
  {
    'id': 0,
    'description': 'The Chamonix Mont Blanc valley and neighbouring mountains are a wonderful natural resource.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=0.0562563005163317',
        'description': 'Chamonix Mont-Blanc: A Wonderful Place in the French Alps'
      }
    ]
  },
  {
    'id': 1,
    'description': 'Amsterdam is the capital and the largest city in the Netherlands.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=0.0762563005163317',
        'description': 'Amsterdam is located in the province of Noord-Holland.'
      }
    ]
  },
  {
    'id': 2,
    'description': 'London is the capital city of the United Kingdom.',
    'name': 'London',
    'pictures': [
      {
        'src': 'https://loremflickr.com/248/152?random=0.0962563005163317',
        'description': 'London is also among the oldest of the world is great cities, with it is history spanning nearly two millennia.'
      }
    ]
  }
];

const offers = [
  {
    'id': 0,
    'title': 'Switch to buisness class',
    'price': '100'
  },
  {
    'id': 1,
    'title': 'Add luggage',
    'price': '50'
  },
  {
    'id': 2,
    'title': 'Add meal',
    'price': '15'
  },
];

const point = [
  {
    'id': 0,
    'basePrice': 1100,
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
    'destination': getRandomArrayElement(destinations),
    'isFavorite': false,
    'offers': getRandomArrayElement(offers),
    'type': getRandomArrayElement(TYPES)
  },
  {
    'id': 1,
    'basePrice': 2100,
    'dateFrom': '2020-07-11T12:55:56.845Z',
    'dateTo': '2020-07-12T14:22:13.375Z',
    'destination': getRandomArrayElement(destinations),
    'isFavorite': false,
    'offers': getRandomArrayElement(offers),
    'type': getRandomArrayElement(TYPES)
  },
  {
    'id': 2,
    'basePrice': 3100,
    'dateFrom': '2021-07-14T21:55:56.845Z',
    'dateTo': '2021-07-15T12:22:13.375Z',
    'destination': getRandomArrayElement(destinations),
    'isFavorite': true,
    'offers': getRandomArrayElement(offers),
    'type': getRandomArrayElement(TYPES)
  }
];

function getRandomPoint() {
  return getRandomArrayElement(point);
}

export { getRandomPoint };
