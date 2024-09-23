import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({theme}) => theme.colors.primary};
    background: #F8F8F8;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
