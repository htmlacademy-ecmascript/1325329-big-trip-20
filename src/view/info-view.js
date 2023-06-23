import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTravelDate, humanizeDateForSameEvent, mapIdToOffers } from '../utils/utils.js';

const createTripInfoMainTemplate = (points, destinations) => {
  const firstDestination = destinations.find((dstntn) => dstntn.id === points[0].destination).name;
  const lastDestination = destinations.find((dstntn) => dstntn.id === points[points.length - 1].destination).name;
  const getMiddleDestination = () => {
    const middleDestinations = [];

    for (let i = 1; i < points.length - 1; i++) {
      const middleDstntn = destinations.find(
        (dstntn) => dstntn.id === points[i].destination
      ).name;
      middleDestinations.push(middleDstntn);
    }

    if (middleDestinations.every((md) => md === firstDestination)) {
      return '&mdash;';
    } else if (middleDestinations.every((md) => md === lastDestination)) {
      return '&mdash;';
    } else if (middleDestinations.every((md, i, arr) => md === arr[0])) {
      return `&mdash; ${middleDestinations[0]} &mdash;`;
    } else {
      return '...';
    }
  };

  const firstDate = humanizeTravelDate(points[0].dateFrom);
  let lastDate;
  if (new Date(points[0].dateFrom).getMonth() === new Date(points[points.length - 1].dateTo).getMonth()) {
    lastDate = humanizeDateForSameEvent(points[points.length - 1].dateTo);
  } else {
    lastDate = humanizeTravelDate(points[points.length - 1].dateTo);
  }
  return `<div class="trip-info__main">
            <h1 class="trip-info__title">${firstDestination} ${getMiddleDestination()} ${lastDestination}</h1>

            <p class="trip-info__dates">${firstDate}&nbsp;&mdash;&nbsp;${lastDate}</p>
          </div>`;
};

const createTripInfoCostTemplate = (points, offers) => {
  const sumBasePrice = (objects) => {
    let sum = 0;
    for (let i = 0; i < objects.length; i++) {
      sum += objects[i].basePrice;
    }
    return sum;
  };

  const allIncludedOffers = [];
  for (let i = 0; i < points.length; i++) {
    const offersForPoint = mapIdToOffers(offers, points[i].offers, points[i].type);
    allIncludedOffers.push(...offersForPoint);
  }

  const sumIncludedOffersPrice = (objects) => {
    let sum = 0;
    for (let i = 0; i < objects.length; i++) {
      sum += objects[i].price;
    }
    return sum;
  };

  const price = sumBasePrice(points) + sumIncludedOffersPrice(allIncludedOffers);

  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
          </p>`;
};

const createInfoTemplate = (points, destinations, offers) =>
  `<section class="trip-main__trip-info  trip-info">
     ${createTripInfoMainTemplate(points, destinations)}
     ${createTripInfoCostTemplate(points, offers)}
   </section>`;


export default class InfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ points, destinations, offers }) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
