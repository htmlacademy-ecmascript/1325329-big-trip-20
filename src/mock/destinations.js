import { getRandomInteger } from '../utils/common.js';

export const destinations = [
  {
    'id': 1,
    'description': 'The Chamonix Mont Blanc valley and neighbouring mountains are a wonderful natural resource.',
    'name': 'Chamonix',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'Chamonix Mont-Blanc: A Wonderful Place in the French Alps'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'Chamonix Mont-Blanc: A Wonderful Place in the French Alps'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'Chamonix Mont-Blanc: A Wonderful Place in the French Alps'
      },
    ]
  },
  {
    'id': 2,
    'description': 'Amsterdam is the capital and the largest city in the Netherlands.',
    'name': 'Amsterdam',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'Amsterdam is located in the province of Noord-Holland.'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'Amsterdam is located in the province of Noord-Holland.'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'Amsterdam is located in the province of Noord-Holland.'
      },
    ]
  },
  {
    'id': 3,
    'description': 'London is the capital city of the United Kingdom.',
    'name': 'London',
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'London is also among the oldest of the world is great cities, with it is history spanning nearly two millennia.'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'London is also among the oldest of the world is great cities, with it is history spanning nearly two millennia.'
      },
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1,30)}`,
        'description': 'London is also among the oldest of the world is great cities, with it is history spanning nearly two millennia.'
      },
    ]
  }
];
