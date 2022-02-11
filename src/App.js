import React,{useState, useEffect} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme'
import {StateProvider,} from './context'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import LayoutManager from './pages/layoutManager';
import LoadingComponent from './components/loadingComponent';
import MerchantApplication from "./pages/merchantApplication";
import SuccessPage from "./pages/successPage";
import FailurePage from "./pages/failurePage";
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
