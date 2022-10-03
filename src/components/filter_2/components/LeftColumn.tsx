import React, { useEffect, useRef } from "react";
import { useCustomContext } from "../store/Context";
import { TFilter } from "../types";
import { useDragAndDrop } from "../utils/useDragAndDrop";

export function LeftColumn() {
  const { state, dispatch } = useCustomContext();

  const setNewCurrentFilter = (filter: TFilter) => {
    dispatch({ type: "SET_CURRENT_FILTER", filter });
  };

  const setIsSetup = () => {
    dispatch({ type: "SET_IS_SETUP", isSetup: true });
  };

  const setRenameFilter = (filter: TFilter) => {
    dispatch({
      type: "SET_RENAME_FILTER",
      filter,
    });
  };

  const setFilterTemplateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_FILTER_TEMPLATE_VALUE", title: e.target.value });
  };

  const createFilterRef = useRef<HTMLInputElement>(null);

  const setIsCreateFilter = () => {
    dispatch({ type: "SET_IS_CREATE_FILTER", isCreate: true });
    setTimeout(() => {
      if (createFilterRef.current) {
        createFilterRef.current.focus();
      }
    }, 200);
  };

  const {
    draggableItems,
    setDraggableItems,
    onDragStart,
    onDragEnter,
    onDragEnd,
  } = useDragAndDrop(state.updateFiltersOrder);

  useEffect(() => {
    setDraggableItems(state.filters.slice().sort((a, b) => a.order - b.order));
  }, [setDraggableItems, state.filters]);

  return (
    <menu>
      <h3>Фильтры</h3>
      {draggableItems
        .filter((f) => Boolean(f.visible))
        .map((item, index) => (
          <div
            style={{
              background:
                state.filterTemplate.id === item.id ? "#fff" : "transparent",
            }}
            key={index}
            draggable={state.isSetup}
            onDragStart={() => onDragStart(item)}
            onDragEnter={(e) => onDragEnter(e, item)}
            onDragEnd={onDragEnd}
          >
            {state.isSetup && <button></button>}
            <input
              key={index}
              type="text"
              value={
                state.filterTemplate.id === item.id
                  ? state.filterTemplate.title
                  : item.title
              }
              onChange={setFilterTemplateValue}
              readOnly={item.id !== state.filterTemplate.id}
              onClick={() => (state.isSetup ? null : setNewCurrentFilter(item))}
              style={{
                color:
                  item.id === state.currentFilter.id ? "#0fa7d7" : "#535c69",
              }}
            />
            {state.isSetup && (
              <button onClick={() => setRenameFilter(item)}></button>
            )}
            {state.isSetup && (
              <button onClick={() => state.deleteFilter(item.id)}></button>
            )}
          </div>
        ))}
      {state.isCreateFilter && (
        <div key="000">
          <input
            ref={createFilterRef}
            type="text"
            value={state.filterTemplate.title || ''}
            onChange={setFilterTemplateValue}
          />
        </div>
      )}
      <button onClick={setIsCreateFilter}>Сохранить фильтр</button>
      <button onClick={setIsSetup}></button>
    </menu>
  );
}
