import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { humanizeTimeEdit, parseDateFromEditFormat } from '../utils/utils.js';
import { TYPES, CITIES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const createDestinationsTemplate = () => CITIES.map((destinations) => `<option value="${destinations}"></option>`);

function createNewPointTemplate(point, destinations, offers) {
  const { basePrice, dateTo, dateFrom, type } = point;
  const pointDestination = destinations.find((dest) => point.destination === dest.id);
  const { pictures } = pointDestination;
  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const dateStart = humanizeTimeEdit(dateFrom);
  const dateEnd = humanizeTimeEdit(dateTo);
  const createImageList = (arr) => arr.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join('');
  const createPicturesList = createImageList(pictures);

  function createOffersTemplate() {
    const isChecked = (offer) => point.offers.includes(offer.id) ? 'checked' : '';
    return typeOffers.map((offer) =>
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
      id = "event-offer-${type}-${point.id}"
      type = "checkbox"
      name = "event-offer-${type}" ${isChecked(offer)}>
    <label class="event__offer-label" for="event-offer-${offer.id}-${point.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
    </input>
    </div>`).join('');
  }

  function createEventTypeItemTemplate(currentType) {
    return TYPES.map((pointType) =>
      `<div class="event__type-item">
        <input class="event__type-input  visually-hidden"
         id="event-type-${pointType}-${point.id}"
         type="radio"
         name="event-type"
         value="${pointType}"
         ${currentType === pointType ? 'checked' : ''}
        >
        <label
         class="event__type-label event__type-label--${pointType}"
         for="event-type-${pointType}-${point.id}">${pointType.charAt(0).toUpperCase().concat(pointType.slice(1))}
        </label>
      </div>`).join('');
  }

  return (
    `
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
           ${createEventTypeItemTemplate()}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${point.id}">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-${point.id}">
        <datalist id="destination-list-${point.id}">
         ${createDestinationsTemplate()};
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
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
        ${createOffersTemplate()}
        </div>
      </section>
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${pointDestination.description}</p>
        <div class="event__photos-container">
          <div class="event__photos-tape">
          ${createPicturesList}
          </div>
        </div>
      </section>
    </section>
  </form>
</li>
`);
}

export default class EditPointView extends AbstractStatefulView {
  // #point = null;
  #datepicker = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  // #handleRollupButtonClick = null;

  constructor({ point, destinations, offers, onFormSubmit }) {
    super();
    this._setState(EditPointView.parsePointToState(point));

    // this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    // this.#handleRollupButtonClick = onRollButtonClick;

    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  reset = (point) => this.updateElement(point);

  _restoreHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formSubmitHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#formSubmitHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    this.element
      .querySelectorAll('.event__offer-checkbox')
      .forEach((offer) => offer.addEventListener('change', this.#offerChangeHandler));

    this.element
      .querySelectorAll('.event__input--time')
      .forEach((date) => date.addEventListener('change', this.#dateChangeHandler));

    this.#setDatepicker();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parsePointToState(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const dstn = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);
    if (dstn) {
      this.updateElement({
        point: {
          ...this._state.point,
          pointDestination: dstn.id,
        }
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const { offers } = this._state.point;
    if (evt.target.checked) {
      this._setState({
        point: {
          ...this._state.point,
          offers: [...offers, Number(evt.target.id)],
        }
      });
    } else {
      const updatedOffers = offers.filter((offer) => offer !== Number(evt.target.id));
      this._setState({
        point: {
          ...this._state.point,
          offers: updatedOffers,
        }
      });
    }
  };

  #dateChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.name === 'event-start-time') {
      this._setState({
        dateFrom: parseDateFromEditFormat(evt.target.value),
      });
    } else {
      this._setState({
        dateTo: parseDateFromEditFormat(evt.target.value),
      });
    }
  };

  #setDatepicker() {
    const dateInputs = this.element.querySelectorAll('.event__input--time');

    this.#datepicker = dateInputs.forEach((dateinput) => {
      let minDate = null;
      if (dateinput === dateInputs[1]) {
        minDate = dateInputs[0].value;
      }

      flatpickr(dateinput,
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          'time_24hr': true,
          minDate: minDate
        });
    });
  }

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    return point;
  }
}
