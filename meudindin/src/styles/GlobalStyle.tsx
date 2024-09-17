import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: 'Ubuntu', sans-serif;
    height: 100%;
    width: 100%;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyle;