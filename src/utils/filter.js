import { FilterType } from '../const.js';
import { isPointPast, isPointPresent, isPointFuture } from './utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateTo, point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateTo)),
};

export { filter };
