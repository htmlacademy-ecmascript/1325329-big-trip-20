import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filterType, isChecked) {
  const { type, count } = filterType;
  return `<div class="trip-filters__filter" >
      <input
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${isChecked ? 'checked' : ''}
      ${count || 'disabled'}
      >
      <label
      class="trip-filters__filter-label"
      for="filter-everything"
      >${type.charAt(0).toUpperCase().concat(type.slice(1))}</label>
  </div>`;
}

function createFilterTemplate(filters) {
  const filterItemsTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
