import createPageTemplate from '../view/page-view.js';
import ItemView from '../view/item-view.js';
import ListView from '../view/list-view.js';
import waypointView from '../view/waypoint-view.js';
import newPointView from '../view/new-point-view.js';
// import editPointView from '../view/';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

const NUMBER_OF_POINTS = 3;

export default class TripPresenter {
  pageComponent = new createPageTemplate();
  listComponents = new ListView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(this.pageComponent, this.listContainer);
    render(new SortView(), this.pageComponent.getElement());
    render(new newPointView(), this.pageComponent.getElement());
    render(new ItemView(), this.pageComponent.getElement());
    render(this.listComponent, this.pageComponent.getElement());

    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      render(new waypointView(), this.listComponent.getElement());
    }
  }
}

