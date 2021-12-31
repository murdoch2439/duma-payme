import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, FormControl, Grid, MenuItem, TextField} from '@material-ui/core'
import {useStripe} from '@stripe/react-stripe-js';
import axios from 'axios'
import FormStepOne from './formStepOne';
import FormStepTwo from './formStepTwo';
import Copyright from '../components/copyright';
import { useStateValue } from '../context';
import {
    API_CREATE_PAYMENT_INTENT,
    API_VALIDATE_PAYMENT_INTENT, CHANGE_MODAL_STATES, ENGLISH_LANG_CODE, FRENCH_LANG_CODE, LOADING_MESSAGE,
    MOBILE_MONEY, Next_STEP, PAY_NOW, PREVIOUS_STEP, SHOW_PENDING_MODAL, SUCCEEDED,
} from '../constants/variableNames';
import logDuma from "../assets/duma1.png";
import {backgroundChanger, languages} from "../utils/helperFunctions";
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
  dumaLogoAndLangContainer:{
      justifyContent:'space-between',
      paddingBottom:10,
    },
  buttons: {
    height:50,
    color:'black',
    marginTop:15,
    width:200
  },
  button: {
    height:40,
    color:'white'
  },
    logoDuma: {
        width:40,
    },
}));

const steps = ['Sender details', 'Review and card details',];

const GetStepContent = ({step}) => {
  switch (step) {
    case 0:
      return <FormStepOne />;
    case 1:
      return <FormStepTwo />;
    default:
      throw new Error('Unknown step');
  }
}

const  FormStepsManager =({ onFailedCheckout: onFailCheckout}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [{ formValues,  }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(ENGLISH_LANG_CODE)
  const [disabled, setDisabled] = useState(false);
  const {t, i18n} = useTranslation()

  const stripe = useStripe();

  const onClickHandler =(lang)=>{
        i18n.changeLanguage(lang).then()
  }


  const handleNext = () => {
    if(activeStep === 1){
      capture().then()
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  };

  const handleReset = () => setActiveStep(0);

  const handleSubmit = (event) =>{
    event.preventDefault()
    handleNext()
  }

   const capture = async () => {
        setLoading(true);
        const billingDetails = {
        email:formValues.email,
        name:formValues.name,
        phone:formValues.phone,
        }

    try{

        if(formValues.paymentMethod === MOBILE_MONEY ){

            setTimeout(()=>{
                dispatch({
                    type: CHANGE_MODAL_STATES,
                    key: SHOW_PENDING_MODAL,
                    value: true
                })

                setLoading(false);
            }, 3000)

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
                console.error('paymentMethod Error!', paymentMethodReq.error.message)

                setError(paymentMethodReq.error.message);
                setLoading(false);
                // dispatch({
                //     type: CHANGE_MODAL_STATES,
                //     key: SHOW_FAIL_MODAL,
                //     value: true
                // })
                onFailCheckout()
                return;
            }

            const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id,

            })
            console.log(paymentIntent)
            setError(false);
            setDisabled(true)


            if (paymentIntent && paymentIntent.status === SUCCEEDED) {
                formValues.paymentIntent = paymentIntent.id
                const paymentIntentObjet = {
                    reference: formValues.transactionReference,
                    receivingAmount: formValues.amount,
                    sendingAmount: parseInt(formValues.amount) + formValues.fees,
                    paymentIntentId: paymentIntent.id,
                    paymentRequestId: formValues.paymentRequestId,
                    fee: formValues.fees,
                    name: formValues.name,
                    email:formValues.email,
                    phone:formValues.phone,
                }

                console.log('Payload to verification ====>', paymentIntentObjet)
                await axios.post(API_VALIDATE_PAYMENT_INTENT, paymentIntentObjet)
                    .then(response => {
                        console.log('Confirmation ===>', response.data)
                        if (response.data.status === 'success') {
                            console.log('payment processed and verified successfully')
                            setLoading(false);
                            setDisabled(true)
                            setError(false);
                            dispatch({
                                type: 'changeModalState',
                                key: "showsuccessmodal",
                                value: true
                            })
                            // onSuccessCheckout()

                        } else {
                            onFailCheckout()
                        }
                    })
            } else if (error) {
                setError(error.message);

                onFailCheckout()
                return;
            }
            handleReset()
        }

    }catch(error){
        console.error('error from the catch', error.message)
        setError('Something went wrong, check your infos, your network and retry');
        setLoading(false);
        setDisabled(true)

    }

            // dispatch({ type: 'emptyFormValue'});

        // setLoading(false);
        // onSuccessfulCheckout()
    }

  return (
    <Box className={classes.layout} display={{ xs:'block' }}  sm={12}>
            <LogoAndLangSwitcher />

          <form autoComplete="off" onSubmit={handleSubmit}>
            <GetStepContent step={activeStep} />
            <Grid >
                  {error && <p style={{ color:'red'}}>{error}</p>}
                  {activeStep !== 0 &&
                    (
                      <Button style={{width:'100%'}} disabled={loading} onClick={handleBack} className={classes.buttons}>
                          {t(PREVIOUS_STEP)}
                      </Button>
                    )
                  }
                  <Button
                    className={classes.button}
                    type="submit"
                    disabled={loading||disabled}

                    style={{backgroundColor:backgroundChanger(loading),  width:'100%', height:50, marginTop:5, color:loading ? '#FBB900':'white'}}
                  >
                    { loading ? t(LOADING_MESSAGE) :
                      activeStep === steps.length-1  ? t(PAY_NOW) : t(Next_STEP)
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

export default FormStepsManager
