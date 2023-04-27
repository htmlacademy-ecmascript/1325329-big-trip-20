import { createElement } from '../render.js';

function createPageTemplate() {
  return (`
  <ul class="trip-events__list"></ul>
  `);
}

export default class waypointView {
  getTemplate() {
    return createPageTemplate();
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
