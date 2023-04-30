import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { RenderPosition, render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const tripInfoElement = document.querySelector('.trip-main');
const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  listContainer: tripListElement,
  pointsModel,
});

render(new InfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripListFilterElement);
render(new SortView(), tripListElement);

boardPresenter.init();
