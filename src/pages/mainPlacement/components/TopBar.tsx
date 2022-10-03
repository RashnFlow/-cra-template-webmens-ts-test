import { FilterAlpha as Filter } from "@webmens-ru/ui_lib";
import { TFilter } from "@webmens-ru/ui_lib/dist/components/filter_2/types";
import { setCurrentFilter, useLazyGetDynamicSelectItemsQuery } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { TopBarButtons } from "../../../components/TopBarButtons";
import { useFilterQuery } from "../hooks/useFilterQuery";
import ControlBar from "./control_bar";

export function TopBar({ parentId }: { parentId: number }) {
  const { mainPlacementSlice } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const filterProps = useFilterQuery({ parentId });  

  const setFilter = (filter: TFilter) => {    
    dispatch(setCurrentFilter(filter));
  };

  const [getItems] = useLazyGetDynamicSelectItemsQuery()

  const getSelectItems = async (type: string, queryKey: string) => {
    const items = await getItems(queryKey)
    return items.data || []
  }

  return (
    <ControlBar title={mainPlacementSlice.title}>
      <Filter
        currentFilter={mainPlacementSlice.currentFilter}
        setCurrentFilter={setFilter}
        {...filterProps}
        onClearFilter={() => filterProps.onSearch([])}
        getSelectItems={getSelectItems}
      />
      <TopBarButtons 
        involvedState={mainPlacementSlice} 
        entity={mainPlacementSlice.entity} 
        excelTitle={mainPlacementSlice.title}
      />
    </ControlBar>
  );
}
