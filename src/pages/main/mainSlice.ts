import { createSlice } from "@reduxjs/toolkit";
import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { TColumnItem, TRowID, TRowItem } from '@webmens-ru/ui_lib/dist/components/grid/types/index';
import { TRawColumnItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { Item } from "@webmens-ru/ui_lib/dist/components/menu/types";
import { IToolbarBlock } from '@webmens-ru/ui_lib/dist/components/toolbar';

interface IState {
  currentTab: Item;
  currentFilter: TFilter;
  filterResponse: null | string;
  toolbarFilterResponse: null | string;
  lastTimeSliderOpened: number | null;
  checkboxes: TRowID[];
  checkedRows: number[];
  isLoading: boolean;
  isError: boolean;
  grid: IGridState;
  schema: TRawColumnItem[]
}

export interface IGridState {
  header?: {
    blocks: IToolbarBlock[]
  };
  grid?: TRowItem[];
  footer?: TRowItem[];
}

const initialState: IState = {
  currentTab: {} as Item,
  currentFilter: {} as TFilter,
  checkboxes: [],
  checkedRows: [],
  filterResponse: null,
  toolbarFilterResponse: null,
  lastTimeSliderOpened: null,
  isLoading: true,
  isError: false,
  grid: {},
  schema: []
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
      state.filterResponse = null;
    },
    setCurrentFilter: (state, { payload }) => {
      state.currentFilter = payload;
    },
    setFilterResponse: (state, { payload }) => {
      state.filterResponse = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsError: (state, { payload }) => {
      state.isError = payload;
    },
    setCheckboxes: (state, { payload }) => {
      state.checkboxes = payload
    },
    setGrid: (state, {payload}) => {
      state.grid = payload
    },
    setSchema: (state, {payload}) => {
      state.schema = payload
    },
    setTimeSliderOpened: (state, { payload }) => {
      state.lastTimeSliderOpened = payload
    },
  },
});

export const {
  setCurrentTab,
  setCurrentFilter,
  setFilterResponse,
  setIsLoading,
  setIsError,
  setCheckboxes,
  setGrid,
  setTimeSliderOpened,
  setSchema
} = mainSlice.actions;
