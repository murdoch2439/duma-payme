import React, {useEffect, useState} from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoadingComponent from "../components/loadingComponent";
import LayoutManager from "../pages/layoutManager";
import MerchantApplication from "../pages/merchantApplication";
import SuccessPage from "../pages/successPage";
import FailurePage from "../pages/failurePage";
import IssuesPage from "../pages/issuesPage";
import NotFoundPage from "../pages/notFoundPage";
import {PUBLIC_KEY} from "../constants/variableNames";
// import {useStateValue} from "../context";

const stripePromise = loadStripe(PUBLIC_KEY)



const Wrapper = () =>{
    // const [{ formValues }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        starter()
    },[])
    const starter = () =>{
        setTimeout(()=> setLoading(false), 3000)
    }

    // console.log('form Valueeeee ====>',formValues)

    return(
        <>
            <Router>
                {
                    loading ?
                        <div className='Loading'>
                            <LoadingComponent />
                        </div>:
                        <Elements stripe={stripePromise}>
                            <Switch>
                                <Route path="/" exact component={LayoutManager} />
                                <Route path="/duma-pay" exact component={MerchantApplication} />
                                <Route path="/success" exact component={SuccessPage} />
                                <Route path="/error" exact component={FailurePage} />
                                <Route path="/issue" exact component={IssuesPage} />
                                <Route path="*"  component={NotFoundPage} />
                            </Switch>
                        </Elements>
                }
            </Router>
        </>

    )
}


export default Wrapper
