import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'hh:mm';
const EDIT_DATE_FORMAT = 'DD/MM/YY HH:MM';
const DURATION_FORMAT = 'DD[D ] HH[H ]mm[M]';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomValue = (max) => Math.floor(Math.random() * max);

const humanizeTravelDate = (dateFrom) => dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';

const humanizeTimeFromTo = (dateTo) => dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';

const humanizeTimeEdit = (dateTime) => dateTime ? dayjs(dateTime).format(EDIT_DATE_FORMAT) : '';

const humanizeTravelTime = (dateFrom, dateTo) => dayjs(dayjs(dateFrom).diff(dateTo)).format(DURATION_FORMAT);

export { getRandomArrayElement, getRandomValue, humanizeTravelDate, humanizeTimeFromTo, humanizeTravelTime, humanizeTimeEdit };

