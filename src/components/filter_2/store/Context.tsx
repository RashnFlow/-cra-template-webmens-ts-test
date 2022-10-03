import { createContext, useContext, useEffect, useReducer } from "react";
import {
  TField,
  TFilter,
  TFilterFieldsItem,
  TGetSelectItems,
  TProps,
  TUpdateFilter
} from "../types";
import { propsFormatter } from "../utils/propsFormatter";

interface IState {
  filters: TFilter[];
  currentFilter: TFilter;
  setCurrentFilter: (f: TFilter) => void;
  createFilter: (f: TFilter) => void;
  updateFilter: (f: TUpdateFilter) => void;
  deleteFilter: (f: TFilter) => void;
  updateFiltersOrder: (f: TFilter[]) => void;
  fields: TField[];
  updateField: (f: TField, param: string) => void;
  updateFieldsOrder: (f: TField[]) => void;
  returnDefaultFields: () => void;
  onSearch: (fields: TField[]) => void;
  onClearFilter: () => void;
  isSetup: boolean;
  isCreateFilter: boolean;
  isEditFilter: boolean;
  filterTemplate: TFilter;
  getSelectItems: TGetSelectItems;
}

const initialState = {
  filters: [],
  currentFilter: {} as TFilter,
  setCurrentFilter: () => {},
  createFilter: () => {},
  updateFilter: () => {},
  deleteFilter: () => {},
  updateFiltersOrder: () => {},
  fields: [],
  updateField: () => {},
  updateFieldsOrder: () => {},
  returnDefaultFields: () => {},
  onSearch: () => {},
  onClearFilter: () => {},
  isSetup: false,
  filterTemplate: {} as TFilter,
  isCreateFilter: false,
  isEditFilter: false,
  getSelectItems: (() =>
    new Promise((res) => res(["error getSelectItems"]))) as TGetSelectItems,
};

type Action =
  | { type: "INITIAL"; props: TProps }
  | { type: "SET_CURRENT_FILTER"; filter: TFilter }
  | { type: "SET_IS_SETUP"; isSetup: boolean }
  | { type: "SET_FILTER_TEMPLATE_VALUE"; title: string }
  | { type: "SET_RENAME_FILTER"; filter: TFilter }
  | { type: "SAVE_RENAME_FILTER" }
  | { type: "SET_IS_CREATE_FILTER"; isCreate: boolean }
  | { type: "SAVE_CREATE_FILTER" }
  | { type: "DELETE_CURRENT_FILTER" }
  | { type: "SET_FILTER_FIELDS"; fields: TFilterFieldsItem[] }
  | { type: "UPDATE_FILTER_FIELD"; field: TField }
  | { type: "SET_FILTER_FIELD_VALUE"; field: TField };

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "INITIAL":
      return {
        ...state,
        ...action.props,
      };
    case "SET_CURRENT_FILTER":
      state.setCurrentFilter(action.filter);
      return {
        ...state,
        currentFilter: action.filter,
      };
    case "SET_IS_SETUP": {
      return {
        ...state,
        isSetup: action.isSetup,
      };
    }
    case "SET_FILTER_TEMPLATE_VALUE":
      return {
        ...state,
        filterTemplate: {
          ...state.filterTemplate,
          title: action.title,
        },
      };
    case "SET_RENAME_FILTER":
      return {
        ...state,
        filterTemplate: action.filter,
        isEditFilter: true,
      };
    case "SAVE_RENAME_FILTER": {
      return {
        ...state,
        filters: state.filters.map((f) =>
          f.id === state.filterTemplate.id ? state.filterTemplate : f,
        ),
        filterTemplate: {} as TFilter,
        isSetup: false,
        isEditFilter: false,
      };
    }
    case "SET_IS_CREATE_FILTER":
      return {
        ...state,
        isCreateFilter: action.isCreate,
      };
    case "SAVE_CREATE_FILTER":
      return {
        ...state,
        filterTemplate: {} as TFilter,
        isSetup: false,
        isCreateFilter: false,
      };
    case "DELETE_CURRENT_FILTER":
      return {
        ...state,
        currentFilter: {} as TFilter,
      };
    case "UPDATE_FILTER_FIELD":
      return {
        ...state,
        fields: state.fields
          .slice()
          .map((item) => (item.id === action.field.id ? action.field : item)),
      };
    case "SET_FILTER_FIELD_VALUE":
      
      const index = state.fields.findIndex(item => item.id === action.field.id);
      const fields = state.fields.slice();
      
      console.log(fields[index], action.field);
      fields[index].value = action.field.value;

      return { ...state, fields };
    default:
      return state;
  }
};

interface IContext {
  state: IState;
  dispatch: (props: Action) => void;
}

export const FilterContext = createContext<IContext>({} as IContext);

export function FilterContextProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "INITIAL", props: propsFormatter(props) });
  }, [props]);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FilterContext.Provider>
  );
}

export const useCustomContext = () => useContext(FilterContext);
