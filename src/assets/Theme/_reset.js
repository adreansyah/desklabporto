import { css } from "styled-components";

export const reset = css`
  @import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");
  /* RESET */
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight: 400;
  }
  ul {
    list-style: none;
    padding-left: 14px;
  }

  button,
  input,
  select,
  textarea {
    padding: 0px;
    margin: 0px;
    border: none;
    outline: none;
    line-height: 1;
    background: transparent;
    font-size: inherit;
  }

  html {
    box-sizing: border-box;
    min-height: 100%;
  }

  body {
    font-size: 14px;
    color: #373d48;
    font-family: "Rubik", sans-serif;    
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;

    overflow-y: scroll;
    cursor: default;
    min-height: 100%;
  }

  *,
  :before,
  :after {
    box-sizing: inherit;
  }

  textarea {
    resize: none;
  }

  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    list-style: none;
    quotes: none;
    font-style: normal;
    outline: none;
  }

  iframe {
    border: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  td,
  th {
    padding: 0;
    text-align: left;
  }
`;
