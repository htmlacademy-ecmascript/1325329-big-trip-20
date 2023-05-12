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
      this.#renderPoint(points[i], destinations, offers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToPoint();
      }
    };

    const pointComponent = new PointView({
      point, destinations, offers, onEditClick: () => {
        replacePointToEdit();
      }
    });

    const pointEditComponent = new EditFormView({
      point, destinations, offers, onFormSubmit: () => {
        replaceEditToPoint();
      },
      // onRollupButtonClick: () => {
      //   replaceEditToPoint();
      // }
    });

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function replaceEditToPoint() {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#listComponent.element);
  }
}
