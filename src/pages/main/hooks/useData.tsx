import { useCallback, useLayoutEffect, useMemo } from "react";
import { setCurrentFilter, setFilterResponse, setIsLoading } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { getFilterResponse } from "../../../app/utils/filterResponse";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";
import {
  useLazyGetFiltersQuery,
  useLazyGetAllFieldsQuery,
  useLazyGetSchemaQuery,
  useLazyGetFieldsQuery,
  useLazyGetGridQuery,
} from "../mainApi";

export const useData = () => {
  const { mainSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [getFilters] = useLazyGetFiltersQuery();
  const [getAllFields] = useLazyGetAllFieldsQuery();
  const [getSchema] = useLazyGetSchemaQuery();
  const [getCurrentFiltersFields] = useLazyGetFieldsQuery();
  const [getGrid] = useLazyGetGridQuery();

  const isCorrect = useMemo(() => {
    return (
      "params" in mainSlice.currentTab &&
      "menuId" in mainSlice.currentTab.params &&
      "entity" in mainSlice.currentTab.params
    );
  }, [mainSlice.currentTab]);

  const init = useCallback(async () => {
    dispatch(setIsLoading(true));
    if (isCorrect) {
      const entity = mainSlice.currentTab.params.entity;
      let currentFilter;
      let currentFields;

      const [filters, allFields] = await Promise.all([
        getFilters(entity),
        getAllFields(entity),
        getSchema(entity),
      ]);

      if (filters.data) {
        currentFilter =
          filters.data.find((f) => Boolean(f.visible)) || filters.data[0];
      }

      if (currentFilter && "id" in currentFilter) {
        dispatch(setCurrentFilter(currentFilter));
        currentFields = await getCurrentFiltersFields(currentFilter.id);
      }

      if (currentFields) {
        const correctFields = concatFieldsAndAllFields(
          currentFields.data,
          allFields.data,
        ).filter((f) => Boolean(f.visible));
        const filterResponse = getFilterResponse(correctFields);
        dispatch(setFilterResponse(filterResponse));
        await getGrid({
          entity,
          filter: filterResponse,
        });
      }
    }
    dispatch(setIsLoading(false));
  }, [dispatch, getAllFields, getCurrentFiltersFields, getFilters, getGrid, getSchema, isCorrect, mainSlice.currentTab]);

  useLayoutEffect(() => {
    init();
  }, [init]);

  return { isCorrect };
};
