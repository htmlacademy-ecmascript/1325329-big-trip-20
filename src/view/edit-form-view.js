import { humanizeTimeEdit } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';

const DEFAULT_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'taxi'
};

function createNewPointTemplate(point, destinations, offers) {
  const { basePrice, dateTo, dateFrom, type, isDisabled, isSaving, isDeleting } = point;
  const pointDestination = destinations.find((dest) => point.destination === dest.id);
  const typeOffers = offers.find((offer) => offer.type === type).offers;
  const dateStart = humanizeTimeEdit(dateFrom);
  const dateEnd = humanizeTimeEdit(dateTo);

  const createOffersTemplate = () => {
    const isChecked = (offer) => point.offers.includes(offer.id) ? 'checked' : '';
    return typeOffers.map((offer) =>
      `<div class="event__offer-selector">
         <input class="event__offer-checkbox  visually-hidden" id="event_${offer.id}_${point.id}" type="checkbox" name="${offer.title}}" ${isChecked(offer)}>
         <label class="event__offer-label" for="event_${offer.id}_${point.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
        </input>
      </div>`).join('');
  };

  const createTypesList = () => offers.map((offer) =>
    `<div class="event__type-${offer.type}">
          <input id="event-type-${offer.type}-${point.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offer.type}" ${offer.type === type ? 'checked' : ''} ">
          <label class="event__type-label event__type-label--${offer.type}" for="event-type-${offer.type}-${point.id}">${offer.type.charAt(0).toUpperCase().concat(offer.type.slice(1))}</label>
        </div>
       `).join('');

  const createDestinationsOption = destinations.map((element) => `<option value="${element.name}"></option>`).join('');

  const isNewPoint = !point.id;
  const templateButtons = isNewPoint
    ? `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>`
    : `<button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button> \n <button class="event__rollup-btn" type="button">`;

  return (`
  <li class="trip-events__item">
   <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox" ${isDisabled ? 'disabled' : ''}>
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
           ${createTypesList()}
          </fieldset>
        </div>
      </div>
      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-${point.id}">${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${pointDestination ? he.encode(pointDestination.name) : ''}" list="destination-list-${point.id}" autocomplete="off" ${isDisabled ? 'disabled' : ''} required>
        <datalist id="destination-list-${point.id}">
         ${createDestinationsOption};
        </datalist>
      </div>
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
        <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''} required>
        &mdash;
        <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
        <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''} required>
      </div>
      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-${point.id}">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-${point.id}" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''} required >
      </div>
      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
      ${templateButtons}
         </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOffersTemplate()}
      </div>
    </section>
    ${pointDestination ? (
      `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${pointDestination.description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${pointDestination.pictures.map((image) => `<img class="event__photo" src="${image.src}" alt="${image.description}">`).join('')}
            </div>
          </div>
        </section>`
    ) : ''}

  </section>
  </form >
</li >
  `);
}

export default class EditPointView extends AbstractStatefulView {
  _state = null;
  #destinations = null;
  #offers = null;
  #datapickerFrom = null;
  #datapickerTo = null;
  #handleFormSubmit = null;
  #handleRollupButtonClick = null;
  #handleCancelClick = null;
  #handleDeleteClick = null;

  constructor({ point = DEFAULT_POINT, destinations, offers, onFormSubmit, onRollButtonClick, onCancelClick, onDeleteClick }) {
    super();
    this._setState(EditPointView.parsePointToState(point));

    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupButtonClick = onRollButtonClick;
    this.#handleCancelClick = onCancelClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(this._state, this.#destinations, this.#offers);
  }

  removeElement() {
    super.removeElement();
    if (this.#datapickerFrom) {
      this.#datapickerFrom.destroy();
      this.#datapickerFrom = null;
    }
    if (this.#datapickerTo) {
      this.#datapickerTo.destroy();
      this.#datapickerTo = null;
    }
  }

  reset = (point) => this.updateElement(EditPointView.parsePointToState(point));

  _restoreHandlers = () => {
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    const rollupButton = this.element.querySelector('.event__rollup-btn');
    if (rollupButton) {
      rollupButton.addEventListener('click', this.#rollupButtonClickHandler);
    }

    const resetButton = this.element.querySelector('.event__reset-btn');
    switch (false) {
      case true:
        resetButton.addEventListener('click', this.#cancelClickHandler);
        break;
      case false:
        resetButton.addEventListener('click', this.#deleteClickHandler);
        break;
    }

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerChangeHandler);

    this.#setDatepicker();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupButtonClick();
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({
      offers: checkedBoxes.map((element) => element.id.split('_')[1])
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const changeDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (changeDestination) {
      this.updateElement({
        destination: changeDestination.id,
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #setDatepicker() {
    const [dateFrom, dateTo] = this.element.querySelectorAll('.event__input--time');
    this.#datapickerFrom = flatpickr(
      dateFrom,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        enableTime: true,
        maxDate: this._state.dateTo,
        'time_24hr': true,
        locale: {
          firstDayOfWeek: 1
        }
      }
    );
    this.#datapickerTo = flatpickr(
      dateTo,
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        enableTime: true,
        minDate: this._state.dateFrom,
        'time_24hr': true,
        locale: {
          firstDayOfWeek: 1
        }
      }
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
  };

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
