import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`

  html, body, #__next {
    height: 100%;
    background-color: #f2f2e6;  //very light grey
    font-family: 'Roboto', sans-serif;

  }
`;
export default function MyGlobalStyle() {
  return <GlobalStyle />;
}