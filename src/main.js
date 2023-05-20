import { RenderPosition, render } from './framework/render.js';
import InfoView from './view/info-view.js';
import FilterView from './view/filter-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';

const tripInfoElement = document.querySelector('.trip-main');
const tripListFilterElement = document.querySelector('.trip-controls__filters');
const tripListElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);

const contentPresenter = new ContentPresenter({ listContainer: tripListElement, pointsModel });

render(new InfoView(), tripInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView({filters}), tripListFilterElement);

contentPresenter.init();
