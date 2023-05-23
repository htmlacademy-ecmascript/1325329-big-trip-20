import AbstractView from '../framework/view/abstract-view.js';

function createTripTemplate() {
  return '<section class="trip-events container"></section>';
}

export default class TripView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createTripTemplate();
  }
}
