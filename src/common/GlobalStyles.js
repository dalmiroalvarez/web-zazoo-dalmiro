import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

export default GlobalStyles;
