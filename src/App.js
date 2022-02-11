import React,{useState, useEffect} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme'
import {StateProvider,} from './context'
import {loadStripe} from '@stripe/stripe-js'

import SuccessPage from "./pages/successPage";
import {PUBLIC_KEY} from "./constants/variableNames";
import Wrapper from "./wrapper/Wrapper";

const stripePromise = loadStripe(PUBLIC_KEY)

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
