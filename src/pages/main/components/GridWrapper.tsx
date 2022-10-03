import { Grid2 as Grid, Loader, Toolbar } from "@webmens-ru/ui_lib";
import type { TCellItem, TRawColumnItem, TRowID } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { IBlockItemMetricFilter, IBlockItemMetricLink } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo } from "react";
import { useSaveSchemaMutation } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { bxOpen } from "../../../app/utils/bx";
import { setCheckboxes, setFilterResponse, setSchema } from "../mainSlice";

export function GridWrapper() {
  const { mainSlice, mainApi } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [schemaMutation] = useSaveSchemaMutation();

  const onCellClick = useCallback((cell: TCellItem) => {
    bxOpen(cell.type, cell.link, cell)
  }, []);

  const handleSchemaMutation = (schema: any) => {
    schemaMutation(schema).then(response => {
      dispatch(setSchema(schema))
    })
  }

  const column = useMemo<any>(
    () =>
      mainApi.queries[`getSchema("${mainSlice.currentTab.params?.entity}")`]
        ?.data,
    [mainApi.queries, mainSlice.currentTab.params?.entity],
  );

  const grid = mainSlice.grid  

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (grid) {
        dispatch(setCheckboxes(arr));
      }
    },
    [dispatch, grid],
  );

  const handleMetricFilter = (item: IBlockItemMetricFilter) => {
    console.log(item);
    
    if (item.params && item.params.url !== null) {
      dispatch(setFilterResponse(item.params.url))
    }
  }

  const handleMetricLink = (item: IBlockItemMetricLink) => {
    // @ts-ignore
    bxOpen(item.params.type, item.params.link, item.params)
  }

  let height;

  (grid.header?.blocks) ? height = 190 : height = 160;

  const windowInnerHeight = window.innerHeight
  
  if (mainSlice.isLoading) return <Loader />;

  return (
    <>
      {grid?.header?.blocks && (
        <Toolbar 
          blocks={grid.header.blocks}
          onMetricFilterClick={handleMetricFilter}
          onMetricLinkClick={handleMetricLink}
          onItemClick={console.log}
        />
      )}
      <Grid 
        columns={column as TRawColumnItem[]}
        rows={grid.grid}
        height={windowInnerHeight - height}
        footer={grid.footer}
        columnMutation={handleSchemaMutation}
        onChangeCheckboxes={checkboxesHandler}
        onBurgerItemClick={console.log}
        onCellClick={onCellClick}
      />
    </>
  );
}
