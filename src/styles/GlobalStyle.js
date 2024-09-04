import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  body {
    // default font style
    font-family: "Inter", sans-serif;
    font-weight: 400;
  }
`;

export default GlobalStyle;
