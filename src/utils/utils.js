import { DATA_FORMAT } from '../const.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

const ALERT_SHOW_TIME = 3000;
const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

const humanizeTravelDate = (date) => date ? dayjs(date).utc().format(DATA_FORMAT.dataDate) : '';

const humanizeTimeFromTo = (date) => date ? dayjs(date).utc().format(DATA_FORMAT.dataStartEndTime) : '';

const humanizeTimeEdit = (date) => date ? dayjs(date).utc().format(DATA_FORMAT.dataStartEndDate) : '';

const humanizeTravelTime = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format(DATA_FORMAT.dataDurationDay);
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format(DATA_FORMAT.dataDurationHour);
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format(DATA_FORMAT.dataDurationMin);
      break;
  }
  return pointDuration;
};

const isPointPast = (dateFrom, dateTo) => (dayjs().isAfter(dayjs(dateFrom)) && dayjs().isAfter(dayjs(dateTo)));

const isPointPresent = (dateFrom, dateTo) => (dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo)));

const isPointFuture = (dateFrom, dateTo) => (dayjs().isBefore(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo)));

function sortByDay(pointA, pointB) {
  if (dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateFrom))) {
    return 1;
  }

  if (dayjs(pointA.dateFrom) === dayjs(pointB.dateFrom)) {
    return 0;
  }

  if (dayjs(pointA.dateFrom).isBefore(dayjs(pointB.dateFrom))) {
    return -1;
  }
}

function sortByTime(pointA, pointB) {
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function capitalizeLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { humanizeTravelDate, humanizeTimeFromTo, humanizeTravelTime, humanizeTimeEdit, isPointFuture, isPointPresent, isPointPast, sortByDay, sortByTime, sortByPrice, capitalizeLetter, showAlert };

