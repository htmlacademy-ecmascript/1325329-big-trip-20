import { createElement } from '../render.js';
import { humanizeTimeEdit } from '../utils.js';

function createNewPointTemplate(point, destinations) {
  const { basePrice, dateTo, dateFrom, type } = point;
  const pointDestination = destinations.find((item) => point.destination === item.id);
  const dateStart = humanizeTimeEdit(dateFrom);
  const dateEnd = humanizeTimeEdit(dateTo);

  return /*html*/`
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            <div class="event__type-item">
            <input id="event-type-${type}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${point.id}">${type}</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${point.id}">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-${point.id}">
        <datalist id="destination-list-${point.id}">
          <option value="${pointDestination.name}">${pointDestination.name}</option>
          <option value="${pointDestination.name}">${pointDestination.name}</option>
          <option value="${pointDestination.name}">${pointDestination.name}</option>
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dateStart}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dateEnd}">
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${point.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}">
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${point.id}" type="checkbox" name="event-offer-luggage" checked>
            <label class="event__offer-label" for="event-offer-luggage-${point.id}">
              <span class="event__offer-title">Add luggage</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">30</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${point.id}" type="checkbox" name="event-offer-comfort" checked>
            <label class="event__offer-label" for="event-offer-comfort-${point.id}">
              <span class="event__offer-title">Switch to comfort class</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">100</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-${point.id}" type="checkbox" name="event-offer-meal">
            <label class="event__offer-label" for="event-offer-meal-${point.id}">
              <span class="event__offer-title">Add meal</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">15</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-${point.id}" type="checkbox" name="event-offer-seats">
            <label class="event__offer-label" for="event-offer-seats-${point.id}">
              <span class="event__offer-title">Choose seats</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">5</span>
            </label>
          </div>
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-${point.id}" type="checkbox" name="event-offer-train">
            <label class="event__offer-label" for="event-offer-train-${point.id}">
              <span class="event__offer-title">Travel by train</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">40</span>
            </label>
          </div>
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">${pointDestination.name}</h3>
        <p class="event__destination-description">${pointDestination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
            <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
            <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
          </div>
        </div>
      </section>
    </section>
  </form>
</li>
`;
}

export default class editPointView {
  constructor(point, destinations, offers) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createNewPointTemplate(this.point, this.destinations, this.offers);
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
