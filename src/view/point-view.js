import AbstractView from '../framework/view/abstract-view.js';
import { humanizeTravelDate, humanizeTimeFromTo, humanizeTravelTime, capitalizeFirstLetter } from '../utils/utils.js';
import he from 'he';

const createOffersTemplate = (offerList) => offerList.map((offer) =>
  ` <li class="event__offer">
      <span class="event__offer-title">${he.encode(offer.title)}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${he.encode(String(offer.price))}</span>
    </li>`).join('');

function createPointTemplate(point, destinations, offers) {
  const { basePrice, dateTo, dateFrom, isFavorite, type, offers: offersList } = point;
  const pointDestination = destinations.find((item) => point.destination === item.id);
  const pointOffers = offers.find((item) => type === item.type);
  const pointOffersList = pointOffers.offers.filter((item) => offersList.includes(item.id));
  const eventOffersList = createOffersTemplate(pointOffersList);

  const dataDay = humanizeTravelDate(dateFrom);
  const dataStart = humanizeTimeFromTo(dateFrom);
  const dateEnd = humanizeTimeFromTo(dateTo);
  const travelTime = humanizeTravelTime(dateFrom, dateTo);

  const favoritePoint = isFavorite ? 'event__favorite-btn--active' : 'event__favorite-btn--disabled';

  return (
    `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dataDay}">${dataDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${capitalizeFirstLetter(type)} ${he.encode(pointDestination.name)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dataStart}">${dataStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateEnd}">${dateEnd}</time>
        </p>
        <p class="event__duration">${travelTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${he.encode(String(basePrice))}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
    ${eventOffersList}
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
`);
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #onFavoriteClick = null;

  constructor({ point, destinations, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-icon')
      .addEventListener('click', this.#favoriteClickHandler);

  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
