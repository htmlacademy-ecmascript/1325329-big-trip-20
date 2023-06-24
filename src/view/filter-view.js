import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/utils.js';

function createFilterItemTemplate(filter, currentFilter) {
  const { type, count } = filter;
  return `
    <div class="trip-filters__filter" >
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${currentFilter === type ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
    </div>`;
}

function createFilterTemplate(filters, currentFilter) {
  const filterItemsTemplate = filters.map((filter) => createFilterItemTemplate(filter, currentFilter)).join('');
  return `
    <form class="trip-filters" action="#" method="get">
     ${filterItemsTemplate}
     <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
