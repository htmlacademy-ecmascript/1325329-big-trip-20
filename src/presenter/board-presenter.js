import ListView from '../view/list-view.js';
import EditFormView from '../view/edit-form-view.js';
import waypointView from '../view/waypoint-view.js';
import { render } from '../render.js';
import { NUMBER_OF_POINTS } from '../view/const.js';

export default class BoardPresenter {
  pageComponent = new ListView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.pageComponent, this.listContainer);
    render(new EditFormView(), this.pageComponent.getElement());

    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      render(new waypointView(), this.pageComponent.getElement());
    }
  }
}

