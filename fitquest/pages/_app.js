import {createGlobalStyle} from 'styled-components'
import React, {useState} from 'react';
import {AuthContext} from "./AuthContext";

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;

}
`


export default function App({ Component, pageProps }) {
  return (
  <>
  <GlobalStyle/>
  <Component {...pageProps} />
  </>
  );
}
  