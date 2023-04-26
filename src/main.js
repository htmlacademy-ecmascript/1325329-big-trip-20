import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/board-presenter.js';
import { render } from './render.js';


const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({ tripContainer: tripListElement });

render(new FilterView(), tripListFilterElement);

tripPresenter.init();
