import { IDateFieldDataItem } from "../../../types";

export const stringDropDownValues = [
  {
    title: 'Точно',
    value: '=',
  },
  {
    title: 'Не указан',
    value: '',
  },
  {
    title: 'Не задан',
    value: 'isNull',
  },
  {
    title: 'Заполнен',
    value: 'isNotNull',
  },
  {
    title: 'Содержится',
    value: '%like%',
  },
  {
    title: 'Начинается с',
    value: '%like',
  },
  {
    title: 'Заканчивается на',
    value: 'like%',
  },
];

export const integerDropDownValues = [
  {
    title: 'Не заполнено',
    value: 'isNull',
  },
  {
    title: 'Точно',
    value: '=',
  },
  {
    title: 'Не равно',
    value: '=<>',
  },
  {
    title: 'Диапазон',
    value: '',
  },
  {
    title: 'Больше чем',
    value: '=>',
  },
  {
    title: 'Меньше чем',
    value: '=<',
  },
  {
    title: 'Больше или равно',
    value: '=>=',
  },
  {
    title: 'Меньше или равно',
    value: '=<=',
  },
];

export type TDateDropDown = {
  value: number;
  title: string;
  attr: string;
};

export const dateDropDown = [
  {
    title: 'Любая дата',
    value: 'anyDate',
  },
  {
    title: 'Вчера',
    value: 'yesterday',
  },
  {
    title: 'Сегодня',
    value: 'today',
  },
  {
    title: 'Завтра',
    value: 'tomorrow',
  },
  {
    title: 'Текущая неделя',
    value: 'currentWeek',
  },
  {
    title: 'Текущий месяц',
    value: 'currentMonth',
  },
  {
    title: 'Текущий квартал',
    value: 'currentQuarter',
  },
  {
    title: 'Последние 7 дней',
    value: 'last7Days',
  },
  {
    title: 'Последние 30 дней',
    value: 'last30Days',
  },
  {
    title: 'Последние 60 дней',
    value: 'last60Days',
  },
  {
    title: 'Последние 90 дней',
    value: 'last90Days',
  },
  {
    title: 'Последние N дней',
    value: 'lastNDays',
  },
  {
    title: 'Следующие N дней',
    value: 'nextNDays',
  },
  {
    title: 'Следующая неделя',
    value: 'nextWeek',
  },
  {
    title: 'Следующий месяц',
    value: 'nextMonth',
  },
  {
    title: 'Месяц',
    value: 'month',
  },
  {
    title: 'Квартал',
    value: 'quarter',
  },
  {
    title: 'Год',
    value: 'year',
  },
  {
    title: 'Точная дата',
    value: 'exactDate',
  },
  {
    title: 'Прошлая неделя',
    value: 'lastWeek',
  },
  {
    title: 'Прошлый месяц',
    value: 'lastMonth',
  },
  {
    title: 'Диапазон',
    value: 'range',
  },
] as IDateFieldDataItem[];

export const monthsDropDown = [
  { value: 1, title: 'Январь' },
  { value: 2, title: 'Февраль' },
  { value: 3, title: 'Март' },
  { value: 4, title: 'Апрель' },
  { value: 5, title: 'Май' },
  { value: 6, title: 'Июнь' },
  { value: 7, title: 'Июль' },
  { value: 8, title: 'Август' },
  { value: 9, title: 'Сентябрь' },
  { value: 10, title: 'Октябрь' },
  { value: 11, title: 'Ноябрь' },
  { value: 12, title: 'Декабрь' },
];

export const yearsDropDown = [
  { value: 0, title: '2000' },
  { value: 1, title: '2001' },
  { value: 2, title: '2002' },
  { value: 3, title: '2003' },
  { value: 4, title: '2004' },
  { value: 5, title: '2005' },
  { value: 6, title: '2006' },
  { value: 7, title: '2007' },
  { value: 8, title: '2008' },
  { value: 9, title: '2009' },
  { value: 10, title: '2010' },
  { value: 11, title: '2011' },
  { value: 12, title: '2012' },
  { value: 13, title: '2013' },
  { value: 14, title: '2014' },
  { value: 15, title: '2015' },
  { value: 16, title: '2016' },
  { value: 17, title: '2017' },
  { value: 18, title: '2018' },
  { value: 19, title: '2019' },
  { value: 20, title: '2020' },
  { value: 21, title: '2021' },
];

export const quartersDropDown = [
  { value: 1, title: 'I' },
  { value: 2, title: 'II' },
  { value: 3, title: 'III' },
  { value: 4, title: 'IV' },
];

export const exampleCheckbox = [
  {
    title: 'filter 1',
  },
];

export const example = [
  {
    type: 'integer',
    title: 'integer',
  },
  {
    type: 'string',
    title: 'string',
  },
  {
    type: 'dropdown',
    title: 'dropdown',
    dropdownValues: [
      {
        value: 1,
        title: 'Не указан',
      },
      {
        value: 2,
        title: 'Информация',
      },
      {
        value: 3,
        title: 'Телефонный звонок',
      },
      {
        value: 4,
        title: 'Отправлен email',
      },
    ],
  },
  {
    type: 'date',
    title: 'date',
  },
  {
    type: 'multiple_select',
    title: 'multiple_select',
    dropdownValues: [
      {
        value: 1,
        title: 'Нет дел',
      },
      {
        value: 2,
        title: 'На сегодня',
      },
      {
        value: 3,
        title: 'Просрочены',
      },
    ],
  },
];
