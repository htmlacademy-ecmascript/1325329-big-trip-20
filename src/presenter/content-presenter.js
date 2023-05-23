import { render, RenderPosition } from '../framework/render.js';
import ListView from '../view/list-view.js';
import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import NoPointView from '../view/no-point-view.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/utils.js';

export default class ContentPresenter {
  #listContainer = null;
  #pointsModel = null;

  #tripComponent = new TripView();
  #listComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #points = [];
  #destinations = [];
  #offers = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ listContainer, pointsModel }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.getPoints()];
    this.#destinations = [...this.#pointsModel.getDestinations()];
    this.#offers = [...this.#pointsModel.getOffers()];

    this.#renderTrip();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
    }
    this.#currentSortType = sortType;
  }

  #hadleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#hadleSortTypeChange
    });
    render(this.#sortComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = ({ point, destinations, offers }) => {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#listComponent.element,
      destinations,
      offers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint({
      point,
      destinations: this.#destinations,
      offers: this.#offers
    }));
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #renderPointsList = () => {
    render(this.#listComponent, this.#tripComponent.element);
    this.#renderPoints();
  };

  #renderTrip() {
    render(this.#tripComponent, this.#listContainer);

    if (!this.#points) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
