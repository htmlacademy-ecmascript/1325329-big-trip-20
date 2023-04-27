import createPageTemplate from '../view/page-view.js';
import ListView from '../view/list-view.js';
import ItemView from '../view/item-view.js';
import editPointView from '../view/edit-point-view.js';
import waypointView from '../view/waypoint-view.js';
import { render } from '../render.js';

const NUMBER_OF_POINTS = 3;

export default class TripPresenter {
  pageComponent = new createPageTemplate();
  listComponent = new ListView();
  itemComponent = new ItemView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.pageComponent, this.listContainer);
    render(new editPointView(), this.listComponent.getElement());
    render(new ItemView(), this.listComponent.getElement());
    render(this.listComponent, this.pageComponent.getElement());

    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      render(new waypointView(), this.listComponent.getElement());
    }
  }
}

