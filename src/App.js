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
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MerchantApplication from "./pages/merchantApplication";
import NotFoundPage from "./pages/notFoundPage";
import SuccessPage from "./pages/successPage";
import FailurePage from "./pages/failurePage";
import IssuesPage from "./pages/issuesPage";
import {PUBLIC_KEY} from "./constants/variableNames";
import Wrapper from "./wrapper/Wrapper";

const stripePromise = loadStripe(PUBLIC_KEY)

const  App =()=> {
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    starter()
  },[])
  const starter = () =>{
      setTimeout(()=> setLoading(false), 3000)
  }

  return (
    <ThemeProvider theme={theme}>
    <StateProvider>
      <Wrapper />
      {/*<Router>*/}
      {/*    {*/}
      {/*      loading ?*/}
      {/*          <div className='Loading'>*/}
      {/*            <LoadingComponent />*/}
      {/*          </div>:*/}
      {/*      <Elements stripe={stripePromise}>*/}
      {/*      <Switch>*/}
      {/*        <Route path="/" exact component={LayoutManager} />*/}
      {/*        <Route path="/duma-pay" exact component={MerchantApplication} />*/}
      {/*        <Route path="/success" exact component={SuccessPage} />*/}
      {/*        <Route path="/error" exact component={FailurePage} />*/}
      {/*        <Route path="/issue" exact component={IssuesPage} />*/}
      {/*        <Route path="*"  component={NotFoundPage} />*/}
      {/*      </Switch>*/}
      {/*      </Elements>*/}
      {/*    }*/}
      {/*  </Router>*/}
    </StateProvider>
    </ThemeProvider>
  );
}

export default App;
