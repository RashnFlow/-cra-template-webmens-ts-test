import { ActionCreatorWithPayload, ThunkDispatch } from "@reduxjs/toolkit";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { Grid2 as Grid, Loader, Toolbar } from "@webmens-ru/ui_lib";
import { TRowID } from "@webmens-ru/ui_lib/dist/components/grid/types";
import { TCellItem } from "@webmens-ru/ui_lib/dist/components/grid_2";
import { BlockItems, IBlockItemMetricFilter, IBlockItemMetricLink } from "@webmens-ru/ui_lib/dist/components/toolbar";
import { useCallback, useMemo } from "react";
import { bxOpen } from "../app/utils/bx";
import { IState } from "../pages/mainPlacement";

// TODO: Изучить типизацию redux-toolkit
interface IGridWrapperProps {
  slice: Partial<IState>;
  api: any;
  schemaSetter: ActionCreatorWithPayload<any>;
  checkboxesSetter: ActionCreatorWithPayload<any>;
  filterSetter: ActionCreatorWithPayload<any>;
  dispatch: ThunkDispatch<any, any, any>;
  onShemaMutation: MutationTrigger<any>;
}

export function GridWrapper({ slice, api, schemaSetter, checkboxesSetter, filterSetter, dispatch, onShemaMutation }: IGridWrapperProps) {
  const onCellClick = useCallback((cell: TCellItem) => {
    if (process.env.NODE_ENV === "production") {
      console.log(cell);

      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell, function () {
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
  }, []);

  const handleSchemaMutation = (schema: any) => {
    onShemaMutation(schema).then(response => {
      dispatch(schemaSetter(schema))
    })
  }

  const column = useMemo<any>(
    () =>
      api.queries[`getSchema("${slice.entity}")`]
        ?.data,
    [api.queries, slice.entity],
  );

  const grid = slice.grid

  const checkboxesHandler = useCallback(
    (arr: TRowID[]) => {
      if (grid) {
        dispatch(checkboxesSetter(arr));
      }
    },
    [checkboxesSetter, dispatch, grid],
  );

  const handleMetricFilter = (item: IBlockItemMetricFilter) => {
    console.log(item);
    
    if (item.params && item.params.url !== null) {
      dispatch(filterSetter(item.params.url))
    }
  }

  const handleMetricLink = (item: IBlockItemMetricLink) => {
    // @ts-ignore
    bxOpen(item.params.type, item.params.link, item.params)
  }
  let height;

  (grid?.header?.blocks) ? height = 190 : height = 160;

  const windowInnerHeight = window.innerHeight

  if (slice.isLoading) return <Loader />;

  return (
    <>
      {grid?.header?.blocks && (
        <Toolbar
          blocks={grid.header.blocks}
          onMetricFilterClick={handleMetricFilter}
          onMetricLinkClick={handleMetricLink}
        />
      )}
      <Grid
        columns={column}
        rows={grid?.grid}
        footer={grid?.footer}
        height={windowInnerHeight - height}
        columnMutation={handleSchemaMutation}
        onChangeCheckboxes={checkboxesHandler}
        onCellClick={onCellClick}
      />
    </>
  );
}
