const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const DATA_FORMAT = {
  dataDate: 'MMM DD',
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

export { TYPES, DATA_FORMAT, FilterType, Mode, SortType };
