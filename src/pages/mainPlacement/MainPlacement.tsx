import { useEffect } from "react";
import { setCheckboxes, setEntity, setFilterResponse, setSchema, setTitle, useLazyGetTitleQuery, useSaveSchemaMutation } from ".";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { GridWrapper } from "../../components/GridWrapper";
import { TopBar } from "./components/TopBar";
import { usePlacementData } from "./hooks/usePlacementData";

export interface MainPlacementProps {
  entity: string,
  parentId: any
}

export default function MainPlacement({ entity, parentId }: MainPlacementProps) {
  const dispatch = useAppDispatch();
  const { mainPlacementSlice, mainPlacementApi } = useAppSelector((state) => state)  
  const [schemaMutation] = useSaveSchemaMutation()
  const [getTitle] = useLazyGetTitleQuery()
  usePlacementData({ entity, parentId });

  useEffect(() => {
    dispatch(setEntity(entity));
    getTitle(entity).then((response) => {
      dispatch(setTitle(response.data.name))
    })
  }, [dispatch, entity, getTitle])

  return (
    <>
      <TopBar parentId={parentId} />
      <GridWrapper
        slice={mainPlacementSlice}
        api={mainPlacementApi}
        dispatch={dispatch}
        onShemaMutation={schemaMutation}
        checkboxesSetter={setCheckboxes}
        schemaSetter={setSchema}
        filterSetter={setFilterResponse}
      />
    </>
  );
}
