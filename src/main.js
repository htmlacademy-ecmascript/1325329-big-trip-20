import { render } from './framework/render.js';
import ContentPresenter from './presenter/content-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic hA2sfda124wcl1sa2j';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const tripInfoElement = document.querySelector('.trip-main');
const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const contentPresenter = new ContentPresenter({
  listContainer: tripListElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripListFilterElement,
  filterModel,
  pointsModel,
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick,
});

export function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  contentPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripInfoElement);

filterPresenter.init();
contentPresenter.init();
pointsModel.init();
