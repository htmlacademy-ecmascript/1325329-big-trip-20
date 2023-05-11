import { render, replace } from '../framework/render.js';
import ListView from '../view/list-view.js';
import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class ContentPresenter {
  #listContainer = null;
  #pointsModel = null;
  #listComponent = new ListView();

  constructor({ listContainer, pointsModel }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    const points = [...this.#pointsModel.getPoints()];
    const destinations = this.#pointsModel.getDestinations();
    const offers = this.#pointsModel.getOffers();
    render(this.#listComponent, this.#listContainer);

    for (let i = 0; i < points.length; i++) {
      this.#renderPoints(points[i], destinations, offers);
    }
  }

  #renderPoints(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point, destinations, offers, onEditClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditFormView({
      point, destinations, offers, onFormSubmit: () => {
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceEditToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
