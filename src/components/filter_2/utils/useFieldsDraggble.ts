import { useState } from "react";

export const useFieldsDraggable = () => {
  const [draggable, setDraggable] = useState(true);

  const onMouseEnter = () => {
    setDraggable(false);
  };

  const onMouseLeave = () => {
    setDraggable(true);
  };

  const events = { onMouseEnter, onMouseLeave };

  return { draggable, events };
};
