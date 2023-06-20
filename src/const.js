const DATA_FORMAT = {
  dataDate: 'MMM DD',
  dataSameDate: 'DD',
  dataStartEndTime: 'HH:mm',
  dataStartEndDate: 'DD/MM/YY HH:MM',
  dataDurationDay: 'DD[D ] HH[H ] mm[M]',
  dataDurationHour: 'HH[H] mm[M]',
  dataDurationMin: 'mm[M]',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export { DATA_FORMAT, FilterType, Mode, SortType, UserAction, UpdateType };
