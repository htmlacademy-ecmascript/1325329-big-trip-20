import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import { RenderPosition, render } from './render.js';
import TripPresenter from './presenter/board-presenter.js';

const tripInfoElement = document.querySelector('.trip-main');
const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ listContainer: tripListElement });

render(new InfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripListFilterElement);
render(new SortView(), tripListElement);

tripPresenter.init();
