import AbstractView from '../framework/view/abstract-view.js';

function createEditPointTemplate() {
  return '';
}

export default class editFormView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createEditPointTemplate;
  }
}
