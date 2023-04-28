import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { RenderPosition, render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripInfoElement = document.querySelector('.trip-main');
const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ listContainer: tripListElement });

render(new InfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripListFilterElement);
render(new SortView(), tripListElement);

boardPresenter.init();
