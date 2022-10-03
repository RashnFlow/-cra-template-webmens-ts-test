import { Button } from "@webmens-ru/ui_lib";
import { useShowControl } from "../hooks/useShowControl";
import { useCustomContext } from "../store/Context";
import { AddFieldsMenu, FilterMenuFooter } from "../styles";
import { TField } from "../types";
import { DashedBlueBtn, DashedGreyBtn } from "./Buttons";
import { AddFieldInput } from "./mini_components/Input";
import { FilterFields } from "./right_column/FilterFields";

export function RightColumn({
  setShowFilter,
}: {
  setShowFilter: (arg: boolean) => void;
}) {
  const { state, dispatch } = useCustomContext();  

  const searchProxy = () => {
    state.onSearch(state.fields.filter((f) => Boolean(f.visible)));
    setShowFilter(false);
  };

  const cancelChanges = () => {
    dispatch({ type: "SET_IS_SETUP", isSetup: false });
    dispatch({ type: "SET_IS_CREATE_FILTER", isCreate: false });
  };

  const saveChanges = () => {
    if (state.isCreateFilter) {
      dispatch({ type: "SAVE_CREATE_FILTER" });
      state.createFilter({
        ...state.filterTemplate,
        menuId: state.filters[0].menuId,
        order: state.filters.filter((f) => Boolean(f.visible)).length + 1,
        parentId: state.currentFilter.id,
      });
    } else if (state.isEditFilter) {
      dispatch({ type: "SAVE_RENAME_FILTER" });
      state.updateFilter(state.filterTemplate);
    } else {
      dispatch({ type: "SET_IS_SETUP", isSetup: false });
    }
  };

  const { ref, isShow, setShow } = useShowControl();

  const change = (item: TField) => {
    state.updateField(
      { ...item, visible: !Boolean(item.visible) },
      Boolean(item.visible) ? "hide" : "create",
    );
    dispatch({
      type: "UPDATE_FILTER_FIELD",
      field: { ...item, visible: !Boolean(item.visible) },
    });
  };

  const onClear = () => {
    state.onClearFilter();
    setShowFilter(false);
  };

  return (
    <div draggable={false}>
      <FilterFields />
      <DashedBlueBtn onClick={() => setShow(!isShow)}>
        Добавить поле
      </DashedBlueBtn>
      <DashedGreyBtn onClick={state.returnDefaultFields}>
        Вернуть поля по умолчанию
      </DashedGreyBtn>
      <FilterMenuFooter>
        {state.isSetup || state.isCreateFilter ? (
          <Button color="success" buttonProps={{ onClick: saveChanges }}>Сохранить</Button>
        ) : (
          <Button color="primary" svgBefore="white-search" buttonProps={{ onClick: searchProxy }}>Найти</Button>
        )}
        {state.isSetup || state.isCreateFilter ? (
          <Button color="light" buttonProps={{ onClick: cancelChanges }}>Отменить</Button>
        ) : (
          <Button color="light" buttonProps={{ onClick: onClear }}>Сбросить</Button>
        )}
      </FilterMenuFooter>
      {isShow && (
        <AddFieldsMenu ref={ref}>
          {state.fields
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((item, index) => (
              <AddFieldInput
                key={index}
                onChange={() => change(item)}
                checked={Boolean(item.visible)}
              >
                {item.title}
              </AddFieldInput>
            ))}
        </AddFieldsMenu>
      )}
    </div>
  );
}
