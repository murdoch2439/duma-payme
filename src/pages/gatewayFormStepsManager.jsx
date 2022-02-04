import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid} from '@material-ui/core'
import {useStripe} from '@stripe/react-stripe-js';
import axios from 'axios'
import GatewayFormStepOne from './gatewayFormStepOne';
import GatewayFormStepTwo from './gatewayFormStepTwo';
import Copyright from '../components/copyright';
import { useStateValue } from '../context';
import {
    API_CREATE_PAYMENT_INTENT, API_MOBILE_MONEY_PAYMENT_INIT,
    API_VALIDATE_PAYMENT_INTENT, CHANGE_MODAL_STATES, CLIENT_FOR_MOBILE_PAYMENT, LOADING_MESSAGE,
    MOBILE_MONEY, Next_STEP, PAY_NOW, PREVIOUS_STEP, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL, SUCCEEDED, SUCCESS,
} from '../constants/variableNames';
// import {  useHistory
// } from "react-router-dom";
import {backgroundChanger, firstThreeDigit} from "../utils/helperFunctions";
import {useTranslation} from "react-i18next";
import LogoAndLangSwitcher from "../components/logoAndLangSwitcher";


const useStyles = makeStyles(() => ({
    layout: {
        width:'100%',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
        paddingTop:10,
    },
    buttons: {
        height:50,
        color:'black',
        marginTop:15,
        width:200
    },
    dumaLogoAndLangContainer:{
        display: { xs: 'flex', sm:'none', md: 'none' },
        justifyContent:'space-between',
        paddingBottom:10,
    },
    button: {
        height:40,
        color:'white'
    },
}));

const steps = ['Sender details', 'Review and card details',];

const GetStepContent = ({step}) => {
    switch (step) {
        case 0:
            return <GatewayFormStepOne />;
        case 1:
            return <GatewayFormStepTwo />;
        default:
            throw new Error('Unknown step');
    }
}

const  GatewayFormStepsManager =({ onFailedCheckout: onFailCheckout}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [{ formValues,  }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const {t,} = useTranslation()

    // const serviceProvider = formValues.phone.substring(0,3)
    // const history = useHistory()
    const stripe = useStripe();

    const handleNextStep = () => {
        if(activeStep === 1){
            capture().then()
        }else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
    };
    // const onClickHandler =(lang)=>{
    //     i18n.changeLanguage(lang).then()
    // }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    };
    const handleReset = () => setActiveStep(0);
    const handleSubmit = (event) =>{
        event.preventDefault()
        handleNextStep()
    }
    const capture = async () => {

        setLoading(true);
        console.log({
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
        })

        const billingDetails = {
            email:formValues.email,
            name:formValues.name,
            // phone:formValues.phone,
        }

        try{

            if(formValues.paymentMethod === MOBILE_MONEY ){
                const payloadForMobileMoney ={
                    initials: formValues.name,
                    surname:formValues.name,
                    email:formValues.email,
                    phone:formValues.phone,
                    currency: formValues.currency,
                    amount: formValues.amount,
                    transfRefNo: formValues.transactionReference,
                    paymentRequestId: formValues.paymentRequestId,
                    service: firstThreeDigit(formValues.phone),
                    client: CLIENT_FOR_MOBILE_PAYMENT
                }
                const response =  await axios.post(API_MOBILE_MONEY_PAYMENT_INIT, payloadForMobileMoney)
                console.log('response on mobile payment init ==> :',response.data)

                setTimeout(()=>{

                    dispatch({
                        type: CHANGE_MODAL_STATES,
                        key: SHOW_PENDING_MODAL,
                        value: true
                    })

                    setLoading(false);
                }, 3000)

                // alert(JSON.stringify(billingDetailsMobileMoney))

            }else{

                const {data: clientSecret} = await axios.post(API_CREATE_PAYMENT_INTENT, {
                    amount: formValues.amount,
                    currency: formValues.currency,
                    receipt_email: formValues.receiverEmail
                })
                const paymentMethodReq = await stripe.createPaymentMethod({
                    type: 'card',
                    card: formValues.card,
                    billing_details: billingDetails,

                })

                if (paymentMethodReq.error) {
                    console.error('paymentMethods Error!')

                    // setError(paymentMethodReq.error.message);
                    setLoading(false);
                    // dispatch({
                    //     type: CHANGE_MODAL_STATES,
                    //     key: SHOW_FAIL_MODAL,
                    //     value: true
                    // })
                    // onFailCheckout()
                    return;
                }

                const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethodReq.paymentMethod.id,

                })
                console.log(paymentIntent)
                // setError(false);
                setDisabled(true)

                if (paymentIntent && paymentIntent.status === SUCCEEDED) {
                    formValues.paymentIntent = paymentIntent.id
                    dispatch({
                        type: CHANGE_MODAL_STATES,
                        key: SHOW_SUCCESS_MODAL,
                        value: true
                    })
                    const paymentIntentObjet = {

                        reference: formValues.transactionReference,
                        receivingAmount: formValues.amount,
                        sendingAmount: parseInt(formValues.amount) ,
                        paymentIntentId: paymentIntent.id,
                        paymentRequestId: formValues.paymentRequestId,
                        fee: formValues.fees,
                        name: formValues.name,
                        email:formValues.email,
                        phone:formValues.phone,
                    }


                    // dispatch({
                    //     type: CHANGE_MODAL_STATES,
                    //     key: SHOW_SUCCESS_MODAL,
                    //     value: true
                    // })

                    const responseFromBffValidation = await axios.post(API_VALIDATE_PAYMENT_INTENT, paymentIntentObjet)
                    console.log('Payload for validation ===>', responseFromBffValidation.data)
                        if(responseFromBffValidation.data.status === SUCCESS){
                            console.log('payment process succeeded')
                            setLoading(false);
                            setDisabled(true)
                            // setError(false);
                            dispatch({
                                type: CHANGE_MODAL_STATES,
                                key: SHOW_SUCCESS_MODAL,
                                value: true
                            })
                            if(formValues.callBackUrl){
                                setTimeout(()=>{
                                    window.location.href = `${formValues.callBackUrl}?success=true`
                                }, 3000)
                            }

                        }else {
                            onFailCheckout()
                        }

                } else if (error) {
                    // setError(error.message);
                    console.log('Error on stripe payment confirmation ===>', error)
                    // onFailCheckout()
                    return;
                }
                handleReset()
            }

        }catch(error){
            console.error('error from the catch in the gateway', error.message)
            setLoading(false);

        }

        // dispatch({ type: 'emptyFormValue'});

        // setLoading(false);
        // onSuccessfulCheckout()
    }

    return (
        <Box className={classes.layout} display={{xs: 'block'}} sm={12}>
            <LogoAndLangSwitcher />

            <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                <GetStepContent step={activeStep} />
                <Grid >

                    {activeStep !== 0 &&
                    (
                        <Button style={{width:'100%'}} onClick={handleBack} className={classes.buttons}>
                            {t(PREVIOUS_STEP)}
                        </Button>
                    )
                    }
                    <Button
                        className={classes.button}
                        type="submit"
                        disabled={loading||disabled || formValues.amount ==="0"}
                        style={{backgroundColor:backgroundChanger(loading),  width:'100%', height:50, marginTop:5, color:loading ? '#FBB900':'white'}}
                    >
                        { loading ? t(LOADING_MESSAGE) :
                            activeStep === steps.length-1  ?  t(PAY_NOW) : t(Next_STEP)
                        }
                    </Button>
                </Grid>
            </form>
            <Grid style={{ marginTop:10}}>
                <Copyright />
            </Grid>
        </Box>
    );
}

export default GatewayFormStepsManager
