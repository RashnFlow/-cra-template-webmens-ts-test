import React from "react";
import { IDashedBlueBtn, IDashedGreyBtn } from "../types";
import { DashedBlueBtnContainer, DashedGreyBtnContainer } from "../styles";

export function DashedBlueBtn({ children, onClick }: IDashedBlueBtn) {
  return (
    <DashedBlueBtnContainer onClick={onClick}>
      {children}
    </DashedBlueBtnContainer>
  );
}

export function DashedGreyBtn({ children, onClick }: IDashedGreyBtn) {
  return (
    <DashedGreyBtnContainer onClick={onClick}>
      {children}
    </DashedGreyBtnContainer>
  );
}
