import { remove, render, RenderPosition } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/utils.js';
import { filter } from '../utils/filter.js';
import ListView from '../view/list-view.js';
import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class ContentPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripComponent = new TripView();
  #listComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({ listContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#listContainer = listContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointsListContainer: this.#listComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      destinations: this.destinations,
      offers: this.offers,
    });

    this.#pointsModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderTrip();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({ resetSortType: true });
        this.#renderTrip();
        break;
    }
  };

  #hadleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderTrip();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#hadleSortTypeChange
    });
    render(this.#sortComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint = ({ point, destinations, offers }) => {
    const pointPresenter = new PointPresenter({
      pointsListContainer: this.#listComponent.element,
      destinations,
      offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #renderPoints = (points, destinations, offers) => {
    points.forEach((point) => this.#renderPoint({
      point,
      destinations: destinations,
      offers: offers
    }));
  };

  #renderNoPoints = () => {
    const points = this.#pointsModel.points;
    const isEmpty = (points.length === 0);
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType,
      isEmpty,
    });

    render(this.#noPointComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  };

  #clearPoints({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPointsList = () => {
    const points = this.points;
    const destinations = this.destinations;
    const offers = this.offers;

    render(this.#listComponent, this.#tripComponent.element);
    this.#renderPoints(points, destinations, offers);
  };

  #renderTrip() {
    render(this.#tripComponent, this.#listContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
  }
}
