import { TField, TFilter, TProps } from "../types";

export const propsFormatter = (props: TProps) => {
  return {
    ...props,
    filters:
      props.filters && Array.isArray(props.filters)
        ? props.filters.slice().sort((a, b) => a.order - b.order)
        : [],
    currentFilter:
      props.currentFilter && typeof props.currentFilter === "object"
        ? props.currentFilter
        : {} as TFilter,
    setCurrentFilter:
      typeof props.setCurrentFilter === "function"
        ? props.setCurrentFilter
        : () => {},
    createFilter:
      typeof props.createFilter === "function" ? props.createFilter : () => {},
    updateFilter:
      typeof props.updateFilter === "function" ? props.updateFilter : () => {},
    deleteFilter:
      typeof props.deleteFilter === "function" ? props.deleteFilter : () => {},
    updateFiltersOrder:
      typeof props.updateFiltersOrder === "function"
        ? props.updateFiltersOrder
        : () => {},
    fields:
      props.fields && Array.isArray(props.fields)
        ? formattedFields(props.fields)
        : [],
    updateField:
      typeof props.updateField === "function" ? props.updateField : () => {},
    updateFieldsOrder:
      typeof props.updateFieldsOrder === "function"
        ? props.updateFieldsOrder
        : () => {},
    returnDefaultFields:
      typeof props.returnDefaultFields === "function"
        ? props.returnDefaultFields
        : () => {},
    onSearch: typeof props.onSearch === "function" ? props.onSearch : () => {},
    onClearFilter:
      typeof props.onClearFilter === "function"
        ? props.onClearFilter
        : () => {},
    getSelectItems:
      typeof props.getSelectItems === "function"
        ? props.getSelectItems
        : () => new Promise<string[]>(()=>{}),
  };
};

const formattedFields = (fields: TField[] = []) => {
  return fields
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((item: TField) => ({
      ...item,
      value: item.value || [],
    }));
};
