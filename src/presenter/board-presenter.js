import ListView from '../view/list-view.js';
import NewFormView from '../view/new-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import WayPointView from '../view/way-point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  listComponent = new ListView();

  constructor({ listContainer, pointsModel }) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.listPoints = [...this.pointsModel.getPoints()];

    render(this.listComponent, this.listContainer);
    render(new NewFormView(), this.listComponent.getElement());
    render(new EditFormView(), this.listComponent.getElement());

    for (let i = 1; i < this.listPoints.length; i++) {
      render(new WayPointView({point: this.listPoints[i]}), this.listComponent.getElement());
    }
  }
}

