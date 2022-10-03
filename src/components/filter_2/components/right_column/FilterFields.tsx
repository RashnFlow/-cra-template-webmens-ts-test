import React, { useEffect, useMemo } from 'react';
import { useCustomContext } from '../../store/Context';
import SelectIntegerField from './filter_fields/SelectInteger';
import SelectStringField from './filter_fields/SelectString';
import { useDragAndDrop } from '../../utils/useDragAndDrop';
import { SelectWrapper } from './filter_fields/Select';
import DateField from './filter_fields/Date';

export function FilterFields() {
  const { state } = useCustomContext();

  const {
    draggableItems,
    setDraggableItems,
    onDragStart,
    onDragEnter,
    onDragEnd,
  } = useDragAndDrop(state.updateFieldsOrder);

  useEffect(() => {
    setDraggableItems(state.fields.slice().sort((a, b) => a.order - b.order));
  }, [setDraggableItems, state.fields]);

  const content = useMemo(() => {    
    return draggableItems
      .slice()
      .filter((f) => Boolean(f.visible))
      .map((item) => {
        const props = {
          key: item.id,
          item,
          onDragStart: () => onDragStart(item),
          onDragEnter: (e: React.MouseEvent<HTMLElement>) =>
            onDragEnter(e, item),
          onDragEnd: onDragEnd,
          updateField: state.updateField,
        };

        switch (item.type) {
          case 'integer':
          case 'number':
            return <SelectIntegerField {...props} />;
          case 'string':
            return <SelectStringField {...props} />;
          case 'select':
          case 'multiple_select':
          case 'select_dynamic':
          case 'multiple_select_dynamic':
            return <SelectWrapper {...props} />;
          case 'date':
            return <DateField {...props} />;
          default:
            return <h3 key="error">Field type error</h3>;
        }
      });
  }, [draggableItems, onDragEnd, onDragEnter, onDragStart, state.updateField]);
  return <>{content}</>;
}
