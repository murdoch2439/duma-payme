import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme'
import {StateProvider,} from './context'
import Wrapper from "./wrapper/Wrapper";

const  App =()=> {

  return (
    <ThemeProvider theme={theme}>
    <StateProvider>
      <Wrapper />
    </StateProvider>
    </ThemeProvider>
  );
}

export default App;
