import React, { useCallback, useEffect, useReducer } from "react";
import styled from "styled-components";
import { Grid2 as Grid, Loader } from "@webmens-ru/ui_lib";
import { initialState, reducer } from "./reducer";
import { TRowID, TRowItem } from "@webmens-ru/ui_lib/dist/components/grid";
import { TopBarButtons } from "../../components/TopBarButtons";
import {
  useLazyGetGridQuery,
  useLazyGetSchemaQuery,
  useSaveSchemaMutation,
} from "./mainDetailApi";
import { TCellItem, TRawColumnItem } from "@webmens-ru/ui_lib/dist/components/grid_2";

export interface MainDetailProps {
  title?: string,
  entity: string,
  body?: any
}

export function MainDetail({ title, entity, body = [] }: MainDetailProps) {
  const [mainDetail, dispatch] = useReducer(reducer, initialState)
  const [getSchema] = useLazyGetSchemaQuery();
  const [getGrid] = useLazyGetGridQuery();
  const [schemaMutation] = useSaveSchemaMutation();

  const checkboxesHandler = useCallback(
    (checkboxes: TRowID[]) => {
      if (mainDetail.grid) {
        dispatch({ type: "SET_CHECKBOXES", checkboxes });
      }
    },
    [mainDetail.grid],
  );

  useEffect(() => {
    Promise.all([
      getSchema(entity),
      getGrid({ entity, body })
    ]).then(([schema, grid]) => {
      dispatch({
        type: "INIT", payload: {
          schema: schema.data,
          grid: grid.data,
        }
      })
    })
  }, []);

  const handleSchemaMutation = (schema: any) => {
    schemaMutation(schema).then(response => {
      dispatch({ type: "SET_SCHEMA", schema })
    })
  }

  const onCellClick = (cell: TCellItem) => {
    if (process.env.NODE_ENV === "production") {
      switch (cell.type) {
        case "openPath":
          BX24.openPath(cell.link, (res: any) => console.log(res));
          break;
        case "openApplication":
          BX24.openApplication(cell);
          break;
        default:
          break;
      }
    } else {
      console.log(cell);
    }
  };

  const windowInnerHeight = window.innerHeight

  if (!mainDetail.inited) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Title children={title} />
        <TopBarButtons
          involvedState={mainDetail}
          entity={entity}
          excelTitle={title}
        />
      </Container>
      {/* <Grid
        column={mainDetail.schema}
        row={mainDetail.grid.grid}
        footer={mainDetail.grid.footer}
        height={100}
        isShowCheckboxes
        onChangeCheckboxes={checkboxesHandler}
        columnMutation={handleSchemaMutation}
        onCellClick={onCellClick}
      /> */}
      <Grid
        columns={mainDetail.schema}
        rows={mainDetail.grid.grid}
        footer={mainDetail.grid.footer}
        height={windowInnerHeight - 46}
        onChangeCheckboxes={checkboxesHandler}
        columnMutation={handleSchemaMutation}
        onCellClick={onCellClick}
      />
    </>
  );
}

const Title = styled.h1`
  margin: 10px 20px;
  font-family: "Open Sans", sans-serif;
  font-size: 26px;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-left: auto;
`;