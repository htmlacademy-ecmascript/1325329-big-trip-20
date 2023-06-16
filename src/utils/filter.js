import { FilterType } from '../const.js';
import { isPointPast, isPointPresent, isPointFuture } from './utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom, point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateFrom, point.dateTo)),
};

export { filter };
