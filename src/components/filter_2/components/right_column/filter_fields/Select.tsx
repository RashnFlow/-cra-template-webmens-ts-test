import { Select } from '@webmens-ru/ui_lib';
import { IDataItem } from '@webmens-ru/ui_lib/dist/components/select/types';
import { useCustomContext } from "../../../store/Context";
import {
  FilterFieldTitle,
  SelectContainer
} from "../../../styles";
import { IField } from "../../../types";
import { useFieldsDraggable } from "../../../utils/useFieldsDraggble";

export function SelectWrapper({ item, updateField, ...props }: IField) {
  const { draggable, events } = useFieldsDraggable();
  const { dispatch } = useCustomContext();  

  const updateValue = (options: IDataItem[]) => {    
    // const value = item.params.multiple ? options.map(option => option.value.toString()) : [options[0].value.toString()]
    const field = { ...item, value: options as unknown as any };
    dispatch({
      type: "SET_FILTER_FIELD_VALUE",
      field,
    });
    updateField(field, "valueWithRefetch");
  };

  return (
    <SelectContainer draggable={draggable} {...props}>
      <FilterFieldTitle>{item.title}</FilterFieldTitle>
      <div {...events}>
        <Select value={item.value.filter(val => val)} {...item.params} onChange={updateValue} />
      </div>
      <span></span>
      <span onClick={() => updateField(item, "hide")}></span>
    </SelectContainer>
  );
}
