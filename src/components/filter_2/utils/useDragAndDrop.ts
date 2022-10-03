import React, { SetStateAction, useCallback, useState } from "react";

/**
 * Hook чтобы сделать массив елементов draggable
 * @param callback Вернет массив элементов (onDragEnd)
 * @returns {Object} Object.
 * @Object .draggableItems - массив элементов, для вывода.
 * @Object .setDraggableItems - в useEffect вызывать с исходным массивом.
 * @info Функции закрепить на каждый элемент.
 * @info draggable={true}
 * @Object .onDragStart -> () => onDragStart(item).
 * @Object .onDragEnter -> (e) => onDragEnter(e, item).
 * @Object .onDragEnd -> (e) => onDragEnd(e).
 */
export const useDragAndDrop = (sendResultFunc: (arg0: any[]) => void) => {
  const [draggableItems, setDraggableItems] = useState<any[]>([]);
  const [moveItem, setMoveItem] = useState<any>({});

  const onDragStart = (item: SetStateAction<{}>) => {
    setMoveItem(item);
  };

  const onDragEnter = useCallback((e: React.MouseEvent<HTMLElement>, item: any) => {
    e.preventDefault();
    if (
      Object.keys(moveItem).length > 0 &&
      Object.keys(moveItem).length === Object.keys(item).length
    ) {
      const copy = draggableItems.slice();
      const indexOfItem = copy.indexOf(item);
      copy.splice(copy.indexOf(moveItem), 1);
      copy.splice(indexOfItem, 0, moveItem);
      setDraggableItems(copy);
    }
  },[draggableItems, moveItem]) ;

  const onDragEnd = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    sendResultFunc(
      draggableItems
        .slice()
        .map((item, index) => ({ ...item, order: index + 1 })),
    );
    setMoveItem({});
  },[draggableItems, sendResultFunc]) ;

  return {
    draggableItems,
    setDraggableItems,
    onDragStart,
    onDragEnter,
    onDragEnd,
  };
};
