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
import {
    API_PAYMENT_INIT, CHANGE_MODAL_STATES,
    CODE_403, CODE_500, EMPTY_STRING,
    MERCHANT_KEY_STRING, OPTION_STRING,
    PAYMENT_REQUEST_ID_STRING,
    SHOW_ACCESS_DENIED_MODAL
} from "../constants/variableNames";
import {useStateValue} from "../context";
import {getClientIpAddress, getUrlParams, responseManager} from "../utils/helperFunctions";
import axios from "axios";



const Wrapper = () =>{
    const [{ formValues }, dispatch] = useStateValue();
    const [currency, setCurrency] = useState('')
    const [publicKey, setPublicKey] = useState(null)
    const merchantKey = getUrlParams()[MERCHANT_KEY_STRING]
    const  paymentRequestId = getUrlParams()[PAYMENT_REQUEST_ID_STRING]
    const option= getUrlParams()[OPTION_STRING]

    useEffect(()=>{
        if(formValues.currency === EMPTY_STRING){
            paymentInitWithBff().then()
        }else{
            setCurrency(formValues.currency)
        }

    },[formValues.currency,])



    const paymentInitWithBff = async () =>{
        try{
            const ip = await getClientIpAddress()
            if(ip){
                const paymentInfo =   {   merchantKey,  paymentRequestId, ip  }
                if(merchantKey){
                    const responseFromBffPaymentInit = await axios.post(API_PAYMENT_INIT, paymentInfo)
                    setCurrency(responseFromBffPaymentInit.data.currency)
                    setPublicKey(loadStripe(responseFromBffPaymentInit.data.clientKey))


                    if((responseFromBffPaymentInit.data.error && responseFromBffPaymentInit.data.code === CODE_403)|| responseFromBffPaymentInit.data.code === CODE_500){

                        console.log("response data from init ==> ", responseFromBffPaymentInit.data)
                        dispatch({
                            type: CHANGE_MODAL_STATES,
                            key: SHOW_ACCESS_DENIED_MODAL,
                            value: true
                        })
                    }else{

                        responseManager({response :responseFromBffPaymentInit, formValues, option})
                    }

                }
            }else{
                console.log('Ip is not provided!!!!!!!!!!')
            }
        }catch(error){
            console.error('Error on payment initialization ==> : ',error)
        }
    }



    return(
        <>
            <Router>
                {
                     !currency ?
                        <div className='Loading'>
                            <LoadingComponent />
                        </div>:
                        <Elements stripe={publicKey}>
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
