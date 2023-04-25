/* import SortView from '../view/sort.view.js';
import ListView from '../view/list-view.js';
import ItemView from '../view/item-view.js';
import { render } from './render.js';

export default class TripPresenter {
  tripComponent = new SortView();
  listView = new ListView();

  constructor({ tripContainer }) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.tripComponent, this.tripContainer);
    render(new ItemView(), this.tripComponent.getElement());
  }
} */
