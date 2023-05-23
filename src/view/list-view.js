import AbstractView from '../framework/view/abstract-view.js';

function createListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createListTemplate();
  }
}
