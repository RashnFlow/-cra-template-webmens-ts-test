import styled from "styled-components";
import gearSvg from "../assets/svg/grid-gear.svg";
import spriteSvg from "../assets/svg/sprite-interface.min.svg";
import searchSvg from "../assets/svg/ui-search-white.svg";

export const FilterContainer = styled.div`
  position: relative;
  width: 800px;
  height: 40px;
  z-index: 15;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  color: rgb(83, 92, 105);
  & > div:first-of-type {
    position: relative;
    z-index: 4;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    cursor: text;
    &:hover {
      & > p {
        opacity: 0.7;
      }
    }
    & > p {
      margin-left: 15px;
      color: #000000;
      line-height: 14px;
      font-weight: 500;
      opacity: 0.5;
    }
    & > div {
      margin: 4px;
      height: 30px;
      padding: 0 15px;
      display: flex;
      background: #bcedfc;
      border-radius: 2px;
      & > button {
        margin: 3px 0px auto 10px;
        width: 13px;
        height: 13px;
        background: url(${spriteSvg}) no-repeat 0px -10px/80%;
        opacity: 0.5;
      }
    }
    & > button {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 20px;
      height: 20px;
      background: url(${searchSvg}) no-repeat center;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const FilterMenuContainer = styled.div`
  position: absolute;
  top: ${({ isShow }: { isShow: boolean }) => (isShow ? "45px" : "85px")};
  left: 0;
  z-index: 4;
  width: 100%;
  display: flex;
  background: #fff;
  cursor: auto;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  opacity: ${({ isShow }) => (isShow ? "1" : "0")};
  transform: scaleY(${({ isShow }) => (isShow ? "1" : "0")});
  transition: transform 0s, top 200ms, opacity 200ms;
  & > menu {
    position: relative;
    padding: 12px 0px 100px;
    width: 215px;
    background: #f8fafb;
    border-right: 1px solid #e7eaec;
    & > h3 {
      margin-bottom: 10px;
      color: #a0a5ab;
      font-size: 8px;
      text-align: center;
      text-transform: uppercase;
    }
    & > div {
      display: grid;
      grid-template: 100% / 20px 158px 20px 20px;
      & > button:nth-of-type(1) {
        margin: auto 3px;
        width: 15px;
        height: 15px;
        background: url(${spriteSvg}) no-repeat 0 -201px;
        cursor: move;
      }
      & > input {
        grid-column: 2;
        padding: 10px 5px;
        width: 100%;
        list-style: none;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        cursor: pointer;
        border-top: 1px solid #e7eaec;
        &:hover {
          color: #000;
        }
      }
      & > button:nth-of-type(2) {
        margin: auto 3px;
        width: 15px;
        height: 15px;
        background: url(${spriteSvg}) no-repeat 0 3px/80%;
      }
      & > button:nth-of-type(3) {
        margin: auto 3px;
        width: 15px;
        height: 15px;
        background: url(${spriteSvg}) no-repeat 0 -12px/80%;
      }
      &:last-of-type input {
        border-bottom: 1px solid #e7eaec;
      }
    }

    & > input {
      padding: 10px 5px;
    }
    & > button {
      opacity: 0.5;
      &:hover {
        opacity: 0.8;
      }
    }
    & > button:first-of-type {
      position: absolute;
      left: 10px;
      padding-left: 15px;
      bottom: 10px;
      color: #212121;
      font-size: 11px;
      text-transform: uppercase;
      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 6px;
        left: 0px;
        width: 10px;
        height: 2px;
        background: #212121;
      }
      &::after {
        transform: rotate(90deg);
      }
    }
    & > button:last-of-type {
      position: absolute;
      right: 13px;
      bottom: 13px;
      width: 10px;
      height: 10px;
      background: url(${gearSvg}) no-repeat center/90%;
    }
  }
  & > div {
    position: relative;
    padding: 20px 0px 100px;
    width: calc(100% - 215px);
    & > button {
      margin-top: 10px;
      margin-left: 25px;
    }
  }
`;

export const PopUp = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 14;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
`;

export const FilterMenuFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 50px);
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
  & > div:first-of-type {
    margin-right: 10px;
  }
`;

export const DashedBlueBtnContainer = styled.button`
  border-bottom: 1px dashed rgba(74, 140, 255, 0);
  color: #1058d0;
  font-size: 13px;
  &:hover {
    color: #4a8cff;
    border-bottom: 1px dashed #4a8cff;
    opacity: 0.8;
  }
`;

export const DashedGreyBtnContainer = styled.button`
  color: #000;
  opacity: 0.5;
  border-bottom: 1px dashed rgba(255, 255, 255, 0);
  font-size: 13px;
  &:hover {
    border-bottom: 1px dashed #000;
    opacity: 0.7;
  }
`;

export const GreenBtnContainer = styled.button`
  padding: 11px 15px;
  background: #bbed21;
  color: #535c69;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background: #d2f95f;
  }
`;

export const FilterCancelContainer = styled.button`
  padding: 0 20px;
  height: 40px;
  color: #535b69;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #c6cdd3;
  border-radius: 2px;
  &:hover {
    background: #cfd4d8;
  }
`;

export const FilterSearchContainer = styled.button`
  position: relative;
  height: 40px;
  padding-left: 44px;
  padding-right: 20px;
  background: #3bc8f5;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  &:hover {
    background: #3eddff;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 5px;
    width: 40px;
    height: 100%;
    background: url(${searchSvg}) no-repeat center/70%;
  }
`;

const FieldContainer = styled.div`
  position: relative;
  padding: 0 25px;
  &:hover > span {
    display: block;
  }
  & > span {
    position: absolute;
    top: 50%;
    left: 5px;
    display: none;
    width: 15px;
    height: 15px;
    background: url(${spriteSvg}) no-repeat 0 -201px;
    cursor: move;
  }
  & > span:last-of-type {
    left: auto;
    right: 5px;
    width: 10px;
    height: 10px;
    background: url(${spriteSvg}) no-repeat 0 -10px/100%;
    cursor: pointer;
  }
`;

export const DropDownFieldStyle = styled(FieldContainer)``;

export const SelectTextStyle = styled(FieldContainer)`
  & > div {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
`;

export const DateFieldContainer = styled(FieldContainer)`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const FilterFieldTitle = styled.h3`
  margin: 7px 1px 6px;
  cursor: default;
  font-size: 13px;
  font-weight: 400;
  color: #a9adb2;
  opacity: 0.7;
  & > div {
    margin-bottom: 10px;
  }
`;

export const AddFieldLabel = styled.label`
  padding: 0 5px;
  height: 30px;
  display: flex;
  align-items: center;
  & > input {
    margin-right: 5px;
  }
`;

export const DateInput = styled.div`
  position: relative;
  width: ${({ width }: { width: string }) => width};
  height: 40px;
  border: 1px solid rgba(83, 92, 105, 0.2);
  & input {
    padding-left: 10px;
    width: 100%;
    height: 100%;
  }
  & button {
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    &:hover {
      background: #ccc;
    }
    &::after {
      content: "";
      position: absolute;
      top: 40%;
      left: 35%;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 3px 5px 3px;
      border-color: transparent transparent #000000 transparent;
    }
  }
  & button:last-of-type {
    top: 50%;
    transform: rotate(180deg);
  }
`;

export const AddFieldsMenu = styled.div`
  position: absolute;
  left: 20px;
  padding: 15px;
  display: flex;
  width: 400px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

export const SelectContainer = styled(FieldContainer)`
  & > div {
    position: relative;
  }
`;

export const SelectHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  background: #fff;
  border: 1px solid rgba(83, 92, 105, 0.2);
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 45%;
    right: 15px;
    width: 6px;
    height: 2px;
    background: #000;
    border-radius: 10px;
    transform: rotate(45deg);
  }
  &::after {
    right: 12px;
    transform: rotate(135deg);
  }
  & > p {
    margin: auto 10px;
  }
`;

export const SelectBody = styled.div`
  position: absolute;
  top: ${({ isShow }: {isShow: boolean}) => (isShow ? "40px" : "80px")};
  z-index: 1;
  width: 100%;
  max-height: 200px;
  flex-direction: column;
  transition: opacity 0.3s, top 0.3s;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transform: ${({ isShow }: {isShow: boolean}) => (isShow ? "scale(1)" : "scale(0)")};
  opacity: ${({ isShow }: {isShow: boolean}) => (isShow ? "1" : "0")};
  & div {
    display: flex;
  }
`;

export const SelectBodyItem = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 40px;
  background: #fff;
  border: 1px solid #ffffff;
  border-top: 0;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
  & div {
    margin: auto 10px;
  }
`;

export const MultipleSelectHeader = styled(SelectHeader)`
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    background: #bcedfc;
    border-radius: 2px;
    & > button {
      margin: 2px 0px 0px 10px;
      width: 12px;
      height: 12px;
      background: url(${spriteSvg}) no-repeat 0px -12px/85%;
    }
  }
`;

export const MultipleSelectBodyItem = styled.label`
  padding: 8px 5px;
  min-height: 40px;
  background: #fff;
  &:hover {
    background: #e7e7e7;
  }
  & input {
    margin: 5px 3px;
  }
`;
