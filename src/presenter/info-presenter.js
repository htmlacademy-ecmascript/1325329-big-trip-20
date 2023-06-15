import { render, RenderPosition } from '../framework/render.js';
import InfoView from '../view/info-view.js';

export default class InfoPresenter {
  #infoContainer = null;
  #pointsModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  constructor({ infoContainer, pointsModel }) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderInfo();
  }

  #renderInfo() {
    const points = this.#points;
    const destinations = this.#destinations;
    const offers = this.#offers;
    const infoView = new InfoView({ points, destinations, offers });
    render(infoView, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
