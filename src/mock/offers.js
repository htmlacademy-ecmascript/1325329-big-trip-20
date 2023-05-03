import { getRandomValue } from '../utils.js';

export const offers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Order Uber',
        price: getRandomValue(300)
      },
      {
        id: 2,
        title: 'Add luggage',
        price: getRandomValue(300)
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 3,
        title: 'Rent a car',
        price: getRandomValue(300)
      },
      {
        id: 1,
        title: 'Add breakfast',
        price: getRandomValue(300)
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 2,
        title: 'Add breakfast',
        price: getRandomValue(300)
      },
      {
        id: 1,
        title: 'Switch to comfort',
        price: getRandomValue(300)
      },
    ],
  },
];
