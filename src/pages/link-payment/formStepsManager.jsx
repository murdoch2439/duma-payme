import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid,} from '@material-ui/core'
import {useStripe} from '@stripe/react-stripe-js';
import FormStepOne from './formStepOne';
import FormStepTwo from './formStepTwo';
import Copyright from '../../components/copyright';
import { useStateValue } from '../../context';
import {
    CHANGE_MODAL_STATES,
    CLIENT_FOR_MOBILE_PAYMENT,
    LOADING_MESSAGE,
    MOBILE_MONEY,
    Next_STEP,
    PAY_NOW,
    PREVIOUS_STEP,
    SHOW_PENDING_MODAL,
    SUCCEEDED,
    SHOW_SUCCESS_MODAL,
    SUCCESS,
    SHOW_FAIL_MODAL, FAILED, DEBIT_CARD,
} from '../../constants/variableNames';
import {backgroundChanger, firstThreeDigit, receivingAmount} from "../../utils/helperFunctions";
import {useTranslation} from "react-i18next";
import LogoAndLangSwitcher from "../../components/logoAndLangSwitcher";
import {PaymentGatewayService} from "../../api";

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
      return <FormStepOne />
    case 1:
      return <FormStepTwo />
    default:
      throw new Error('Unknown step')
  }
}

const  FormStepsManager =() => {
  const classes = useStyles()
  const stripe = useStripe();
  const [activeStep, setActiveStep] = useState(0);
  const [{ formValues,  }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const {t,} = useTranslation()

  const businessObject = {currency:formValues.currency, clientCurrency:formValues.clientCurrency, amount: formValues.amount, rate:formValues.rate}


  const handleNext = () => {
    if(activeStep === 1){
      capture().then()
    }else{
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  };
  const handleReset = () => setActiveStep(0)
  const handleSubmit = (event) =>{
    event.preventDefault()
    handleNext()
  }

   const capture = async () => {
        setLoading(true)
       formValues.paymentProcessStarted = true

        const billingDetails = {
        email:formValues.email,
        name:formValues.name,
        phone:formValues.phone,
        }

        try{
                if(formValues.paymentMethod === MOBILE_MONEY ){
                    const payloadForMobileMoney ={
                    initials: formValues.name,
                    surname:formValues.name,
                    email:formValues.email,
                    phone:formValues.phone,
                    amount: formValues.amount,
                    currency:formValues.currency,
                    transRefNo: formValues.transactionReference,
                    paymentRequestId: formValues.paymentRequestId,
                    service: firstThreeDigit(formValues.phone),
                    client: CLIENT_FOR_MOBILE_PAYMENT
                }

                    const response =  await PaymentGatewayService.mobileMoney(payloadForMobileMoney)

                    if(response.data.status === SUCCESS){
                            setLoading(false);
                        // setTimeout(()=>{
                            dispatch({
                                type: CHANGE_MODAL_STATES,
                                key: SHOW_PENDING_MODAL,
                                value: true
                            })
                        //     setLoading(false);
                        // }, 3000)
                    }if(response.data.status === FAILED){
                        setLoading(false);
                        console.log("Response when status is failed : ",response.data)
                    }else{
                        setLoading(false);
                        console.log(response.data)
                    }

            }
                if(formValues.paymentMethod === DEBIT_CARD){
                    const clientSecret = await PaymentGatewayService.stripeInit( {
                        amount: formValues.amount,
                        currency: formValues.currency,
                        receipt_email: formValues.receiverEmail
                    })

                    const paymentMethodReq = await stripe.createPaymentMethod({
                        type: 'card',
                        card: formValues.card,
                        billing_details: billingDetails,
                    })

                if(paymentMethodReq.error) {
                        console.error('paymentMethods Error  ===>', paymentMethodReq.error.message)
                        setLoading(false);
                        // dispatch({
                        //     type: CHANGE_MODAL_STATES,
                        //     key: SHOW_FAIL_MODAL,
                        //     value: true
                        // })
                        // onFailCheckout()
                        // return;
                }else{
                        const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret, {
                            payment_method: paymentMethodReq.paymentMethod.id,
                        })

                        setDisabled(true)
                        if(paymentIntent && paymentIntent.status === SUCCEEDED) {
                            formValues.paymentIntent = paymentIntent.id
                            dispatch({
                            type: CHANGE_MODAL_STATES,
                            key: SHOW_SUCCESS_MODAL,
                            value: true
                        })
                            const paymentIntentObjetForBffValidation = {
                            reference: formValues.transactionReference,
                            receivingAmount: receivingAmount(businessObject),
                            sendingAmount: parseInt(formValues.amount),
                            paymentIntentId: paymentIntent.id,
                            paymentRequestId: formValues.paymentRequestId,
                            fee: formValues.fees,
                            name: formValues.name,
                            email:formValues.email,
                            phone:formValues.phone,
                        }

                            // console.log('Payload to verification ====>', paymentIntentObjetForBffValidation)

                            const responseFromBffValidation = await PaymentGatewayService.validate( paymentIntentObjetForBffValidation)

                            if(responseFromBffValidation.data.status === SUCCESS){
                                    console.log('payment processed and verified successfully')
                                    setLoading(false);
                                    setDisabled(true)

                                    dispatch({
                                        type: CHANGE_MODAL_STATES,
                                        key: SHOW_SUCCESS_MODAL,
                                        value: true
                                    })
                            }else{
                                console.log('Something happened during validation with Bff ===>', responseFromBffValidation.data )
                                // onFailCheckout()
                            }
                    } else if(error) {
                        console.log('Error on stripe payment confirmation ===>', error)
                        // setError(error.message);
                        // onFailCheckout()
                        dispatch({
                            type: CHANGE_MODAL_STATES,
                            key: SHOW_FAIL_MODAL,
                            value: true
                        })
                    }
                    handleReset()
                }
            }
        }catch(error){
                console.error('error from the catch ===>', error)
                // setError('Something went wrong, check your infos, your network and retry');
                setLoading(false);
                // setDisabled(true)
        }
   }

  return (
    <Box className={classes.layout} display={{ xs:'block' }} sm={12}>
          <LogoAndLangSwitcher />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <GetStepContent step={activeStep}  />
            <Grid >
                  {activeStep !== 0 &&
                    (
                      <Button style={{width:'100%'}} disabled={formValues.paymentProcessStarted||loading} onClick={handleBack} className={classes.buttons}>
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
