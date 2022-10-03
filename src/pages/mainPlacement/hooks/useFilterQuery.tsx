import { TField } from "@webmens-ru/ui_lib/dist/components/filter/types";
import { useCallback, useMemo } from "react";
import {
  setFilterResponse, setIsLoading, useAddFieldMutation, useCreateFilterMutation, useDeleteFieldMutation, useDeleteFilterMutation,
  useLazyGetFieldsQuery, useUpdateFieldMutation, useUpdateFilterMutation, useUpdateFiltersOrderMutation
} from "..";
import { axiosInst } from "../../../app/api/baseQuery";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { getFilterResponse } from "../../../app/utils/filterResponse";
import { concatFieldsAndAllFields } from "../../../app/utils/formatters/fields";

export const useFilterQuery = ({ parentId }: { parentId: number }) => {
  const dispatch = useAppDispatch();
  const { mainPlacementSlice, mainPlacementApi } = useAppSelector((state) => state);
  const [createFilter] = useCreateFilterMutation();
  const [updateFilter] = useUpdateFilterMutation();
  const [deleteFilter] = useDeleteFilterMutation();
  const [updateFiltersOrder] = useUpdateFiltersOrderMutation();
  const [updateFieldMut] = useUpdateFieldMutation();
  const [createField] = useAddFieldMutation();
  const [deleteField] = useDeleteFieldMutation();
  const [getFieldsQuery] = useLazyGetFieldsQuery();

  const onSearch = useCallback(
    async (fields: TField[]) => {      
      dispatch(setIsLoading(true));      
      const filterResponse = getFilterResponse(fields);
      
      getFieldsQuery(mainPlacementSlice.currentFilter.id);
      dispatch(setFilterResponse(filterResponse));
      dispatch(setIsLoading(false));
    },
    [dispatch, getFieldsQuery, mainPlacementSlice.currentFilter],
  );

  const updateField = async (filter: TField, param: string) => {
    if (param === "hide") {
      deleteField(filter.id);
    }
    if (param === "create") {
      createField({
        ...filter,
        filterFieldId: -filter.id,
        filterId: mainPlacementSlice.currentFilter.id,
      });
    }
    if (param === "value") {
      await axiosInst.post(
        `/admin/ui/filter/filter-field-setting/update?id=${filter.id}`,
        filter,
      );
    }
    if (param === "valueWithRefetch") {
      updateFieldMut(filter);
    }
  };

  const filters = useMemo<any>(
    () =>
      mainPlacementApi.queries[`getFilters("${mainPlacementSlice.entity}")`]
        ?.data,
    [mainPlacementApi.queries, mainPlacementSlice.entity],
  );

  const f = useMemo<any>(
    () => mainPlacementApi.queries[`getFields(${mainPlacementSlice.currentFilter?.id})`]?.data,
    [mainPlacementApi.queries, mainPlacementSlice.currentFilter?.id],
  );
  const all = useMemo<any>(
    () =>
      mainPlacementApi.queries[`getAllFields("${mainPlacementSlice.entity}")`]
        ?.data,
    [mainPlacementApi.queries, mainPlacementSlice.entity],
  );

  const fields = useMemo<any>(() => concatFieldsAndAllFields(f, all), [all, f]);  

  const updateFieldsOrder = async (fields: TField[]) => {
    await axiosInst.post(
      "/admin/ui/filter/filter-field-setting/edit-order",
      fields.filter((f) => f.visible),
    );
  };

  return {
    filters,
    fields,
    createFilter,
    updateFilter,
    deleteFilter,
    updateFiltersOrder,
    updateFieldsOrder,
    updateField,
    onSearch,
  };
};
