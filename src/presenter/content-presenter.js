import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import NewFormView from '../view/new-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({ listContainer, pointsModel }) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    render(this.listComponent, this.listContainer);
    const points = this.pointsModel.getPoints();
    const destinations = this.pointsModel.getDestinations();
    const offers = this.pointsModel.getOffers();
    render(new NewFormView(points[0], destinations, offers), this.listComponent.getElement());
    render(new EditFormView(points[0], destinations, offers), this.listComponent.getElement());

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.listComponent.getElement());
    }
  }
}
