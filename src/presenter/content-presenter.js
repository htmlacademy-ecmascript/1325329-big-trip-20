import { remove, render, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/utils.js';
import { filter } from '../utils/filter.js';
import { handleNewPointFormClose } from '../main.js';
import ListView from '../view/list-view.js';
import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import InfoView from '../view/info-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class ContentPresenter {
  #listContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripComponent = new TripView();
  #listComponent = new ListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #infoComponent = null;
  #mainComponent = document.querySelector('.trip-main');
  #noPointComponent = null;
  #isNewPointFormOpened = false;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

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
      onModeChange: this.#handleModeChange,
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
    this.#renderTrip();
  }

  createPoint() {
    this.#isNewPointFormOpened = true;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init({ destinations: this.destinations, offers: this.offers });
    if (this.points.length === 0) {
      remove(this.#noPointComponent);
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    if (this.points.length === 0) {
      this.#renderNoPoints();
    }
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        handleNewPointFormClose();
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderError('Can\'t reach server. Please, try again.');
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

  #renderInfo() {
    const points = this.#pointsModel.points.sort(sortByDay);
    const destinations = this.destinations;
    const offers = this.offers;
    this.#infoComponent = new InfoView({points, destinations, offers});

    render(this.#infoComponent, this.#mainComponent, RenderPosition.AFTERBEGIN);
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

  #renderLoading() {
    render(this.#loadingComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderError(error) {
    const errorComponent = new ErrorView({ message: error });
    render(errorComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

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
    remove(this.#loadingComponent);

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

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#isNewPointFormOpened) {
      this.#renderNoPoints();
      return;
    }

    if (this.#infoComponent) {
      remove(this.#infoComponent);
    }

    remove(this.#noPointComponent);
    this.#renderInfo();
    this.#renderSort();
    this.#renderPointsList();
  }
}
