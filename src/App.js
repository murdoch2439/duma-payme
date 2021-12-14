import React,{useState, useEffect} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './constants/theme'
import {StateProvider} from './context'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import LayoutManager from './pages/layoutManager';
import LoadingComponent from './components/loadingComponent';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SuccessPage from './pages/successPage';
import SuccessPage1 from './pages/successPage1';
import FailurePage from './pages/failurePage';
import PendingPage from "./pages/pendingPage";
import MerchantApplication from "./pages/merchantApplication";

const stripePromise = loadStripe("pk_test_51J8ifiJQ1zXpJJ2OZ6BarkiBEUeCmARiEMx2cp3ZI4cDSTWJ15AHTy1HWREb7HrObRwXcsneRfbLXvo5IQKQWM2000bkx3L5tB")

const  App =()=> {
  const [loading, setLoading] = useState(true)




  useEffect(()=>{
    starter()
  },[])

  const starter = () =>{
    // if(formValues.currency){
      setLoading(false)
    // }

  }

  return (
    <ThemeProvider
    theme={theme}
    >
    <StateProvider>
      <Router>

          {
            loading ?
                <div className='Loading'>
                  <LoadingComponent />
                </div>:
            <Elements stripe={stripePromise}>
            <Switch>
              <Route path="/" exact component={LayoutManager} />

              <Route path="/success" component={SuccessPage} />
              <Route path="/success1" component={SuccessPage1} />
              <Route path="/failure" component={FailurePage} />
              <Route path="/payment-pending" component={PendingPage} />
              <Route path="/duma-pay" exact component={MerchantApplication} />

            </Switch>
            </Elements>
          }

        </Router>

    </StateProvider>
    </ThemeProvider>
  );
}

export default App;
