import { createGlobalStyle } from "styled-components";
import { normalize } from "./_normalize";
import { reset } from "./_reset";

const GlobalStyles = createGlobalStyle`
  
  ${normalize};
  ${reset};

  body {
    @import url('https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap');
    font-family: 'Rubik', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }
  
`;

export default GlobalStyles;
