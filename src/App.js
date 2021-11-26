import React,{useState, useEffect} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
// import theme from './constants/theme'
import {StateProvider} from './context'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import LayoutManager from './pages/layoutManager';
import LoadingComponent from './components/loadingComponent';
// import {useStateValue} from './context/'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SuccessPage from './pages/successPage';
import FailurePage from './pages/failurePage';
import PendingPage from "./pages/pendingPage";

const stripePromise = loadStripe("pk_test_51J8ifiJQ1zXpJJ2OZ6BarkiBEUeCmARiEMx2cp3ZI4cDSTWJ15AHTy1HWREb7HrObRwXcsneRfbLXvo5IQKQWM2000bkx3L5tB")

const  App =()=> {
  const [loading, setLoading] = useState(true)
  // const [formValues, dispatch] = useStateValue()
  // console.log(formValues)

  useEffect(()=>{
    starter()
  },[])

  const starter = () =>{
    setTimeout(()=>{
        setLoading(false)
    }, 5000)

  }
//  const path="/:adminId&:payerId"

  return (
    <ThemeProvider
    // theme={theme}
    >
    <StateProvider>
      <Router>
        <div className="App">
          {
            loading ?
                <div className='Loading'>
                  <LoadingComponent />
                </div>:
            <Elements stripe={stripePromise}>
            <Switch>
              <Route path="/" component={LayoutManager} />

              <Route path="/success" component={SuccessPage} />
              <Route path="/failure" component={FailurePage} />
              <Route path="/payment-pending" component={PendingPage} />

            </Switch>
            </Elements>
          }

        </div>
        </Router>

    </StateProvider>
    </ThemeProvider>
  );
}

export default App;
