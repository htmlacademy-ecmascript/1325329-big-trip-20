import { createElement } from '../render.js';
import { humanizeTravelDate, humanizeTimeFromTo, humanizeTravelTime } from '../utils.js';

function createPointTemplate(point, destinations, offers) {
  const { basePrice, dateTo, dateFrom, isFavorite, type } = point;
  const pointDestination = destinations.find((dest) => point.destination === dest.id);
  // const pointOffer = offers.find((offer) => offer.type === type);
  // const checkedOffers = pointOffer.offers.filter((offer) => offers.includes(offer.id));
  const dataDay = humanizeTravelDate(dateTo);
  const dataStart = humanizeTimeFromTo(dateFrom);
  const dateEnd = humanizeTimeFromTo(dateTo);
  const travelTime = humanizeTravelTime(dateTo, dateFrom);
  const favoritePoint = isFavorite ? 'event__favorite-btn--active' : 'event__favorite-btn--disabled';

  function createOffersTemplate(offersList) {
    return offersList.map((offer) => `<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
       <span class="event__offer-price">${offer.price}</span>
   </li>`).join('');
  }

  // const offersTemplate = () => {
  //   if (checkedOffers.length) {
  //     const template = checkedOffers.map((offer) => ` <li class="event__offer">
  //     <span class="event__offer-title">${offers.title}</span>
  //     &plus;&euro;&nbsp;
  //     <span class="event__offer-price">${offers.price}</span>
  //   </li>`).join('');
  //     return template;
  //   }
  //   {
  //     return `li class="event__offer">
  //   <span class="event__offer-title">No offers</span>
  //   </li>`;
  //   }
  // };

  return /*html*/`
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dataDay}">${dataDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${pointDestination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dataStart}">${dataStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEnd}">${dateEnd}</time>
        </p>
        <p class="event__duration">${travelTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
    ${createOffersTemplate(offers)}

      </ul>
      <button class="event__favorite-btn ${favoritePoint}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
`;
}

export default class PointView {
  constructor(point, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
