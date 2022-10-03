import { createGlobalStyle } from "styled-components";
import { OpenSansBold, OpenSansExtraBold, OpenSansLight, OpenSansRegular, OpenSansSemiBold } from "../fonts/OpenSans";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansLight}) format("truetype");
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansRegular}) format("truetype");
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansSemiBold}) format("truetype");
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansBold}) format("truetype");
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url(${OpenSansExtraBold}) format("truetype");
    font-weight: 800;
    font-style: normal;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans';
  }
`