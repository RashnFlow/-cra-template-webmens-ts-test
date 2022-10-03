import { Grid2 as Grid, Loader, Toolbar } from "@webmens-ru/ui_lib";
import { TRowID, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { TCellItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { BlockItems } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo } from "react";
import { useSaveSchemaMutation } from "..";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { setCheckboxes, setSchema } from "../mainPlacementSlice";

export function GridWrapper() {
  const { mainPlacementSlice, mainPlacementApi } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [schemaMutation] = useSaveSchemaMutation();

  const onCellClick = useCallback((cell: TCellItem) => {
    if (process.env.NODE_ENV === "production") {
      console.log(cell);
      
      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell, function() {
            if (cell.updateOnCloseSlider) {
              // dispatch(setTimeSliderOpened(Date.now()))
              // TODO: Сделать функцию в хуке useData по вызову обновления
            }
          });
          break;
        case "openLink":
          window.open(cell.link);
          break;
        default:
          break;
      }
    } else if (cell.type === "openLink") {
      window.open(cell.link);
    } else {
      console.log(cell);
    }
  }, [dispatch]);

  const handleSchemaMutation = (schema: any) => {
    schemaMutation(schema).then(response => {
      dispatch(setSchema(schema))
    })
  }

  const column = useMemo<any>(
    () =>
      mainPlacementApi.queries[`getSchema("${mainPlacementSlice.entity}")`]
        ?.data,
    [mainPlacementApi.queries, mainPlacementSlice.entity],
  );

  const grid = mainPlacementSlice.grid  

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (grid) {
        dispatch(setCheckboxes(arr));
      }
    },
    [dispatch, grid],
  );

  const handleToolbarItemClick = (item: BlockItems) => {
    // if (item.params && item.params.url !== null) {
    //   dispatch(setFilterResponse(item.params.url))
    // }
  }
  

  if (mainPlacementSlice.isLoading) return <Loader />;
  return (
    <>
      {grid?.header?.blocks && (
        <Toolbar 
          blocks={grid.header.blocks}
          onItemClick={handleToolbarItemClick}
        />
      )}
      <Grid
        columns={column}
        rows={grid?.grid}
        footer={grid?.footer}
        columnMutation={handleSchemaMutation}
        onChangeCheckboxes={checkboxesHandler}
        onCellClick={onCellClick}
      />
    </>
  );
}
