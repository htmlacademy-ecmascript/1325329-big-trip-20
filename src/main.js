// import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import { render } from './render.js';
// import TripPresenter from './presenter/trip-presenter.js';

const siteBodyElement = document.querySelector('.trip-main');
const siteFilterElement = siteBodyElement.querySelector('.trip-controls__filters');
// const tripPresenter = new TripPresenter({tripContainer: siteBodyElement});

// render(new InfoView(), siteBodyElement);
render(new FilterView(), siteFilterElement);

// tripPresenter.init();
