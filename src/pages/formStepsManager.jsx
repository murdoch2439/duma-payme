import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid} from '@material-ui/core'
import {useStripe} from '@stripe/react-stripe-js';
import axios from 'axios'
import FormStepOne from './formStepOne';
import FormStepTwo from './formStepTwo';
import Copyright from '../components/copyright';
import { useStateValue } from '../context';
import { API_CREATE_PAYMENT_INTENT, API_VALIDATE_PAYMENT_INTENT } from '../constants/variableNames';




const useStyles = makeStyles(() => ({
  layout: {
        width:'100%',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10
  },
  form: {

  },
  buttons: {
    height:50,
    color:'black',
    marginTop:15,
    width:200
  },
  button: {
    height:50,
    color:'white'
  },
}));

const steps = ['Sender details', 'Review and card details',];

const GetStepContent = ({step}) => {
  switch (step) {
    case 0:
      return <FormStepOne />;
      // return <FormStepOne />
    case 1:
      return <FormStepTwo />;
    default:
      throw new Error('Unknown step');
  }
}

const  FormManager =({onSuccessfulCheckout, onFailedCheckout}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [{ formValues }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const backgroundChanger = () =>{
    if(!loading){
      return '#FBB900'
    }else{
      return '#F5F5F5'
    }
  }

    const stripe = useStripe();


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


        const {data:clientSecret} = await axios.post(API_CREATE_PAYMENT_INTENT, {amount:formValues.amount , currency:formValues.currency, receipt_email:formValues.receiverEmail} )
        console.log('total ====>', parseInt(formValues.amount) + formValues.fees)
        const paymentMethodReq = await stripe.createPaymentMethod({
            type:'card',
            card:formValues.card,
            billing_details: billingDetails,

        })

         if (paymentMethodReq.error) {
           console.error('paymentMethod Error!')

            setError(paymentMethodReq.error.message);
            setLoading(false);
            onFailedCheckout()
            return;
        }

        const {paymentIntent, error} =await stripe.confirmCardPayment(clientSecret,{
            payment_method:paymentMethodReq.paymentMethod.id,

        })
        console.log(paymentIntent)
        setError(false);
        setDisabled(true)


         if (paymentIntent && paymentIntent.status === "succeeded") {
           formValues.paymentIntent = paymentIntent.id
           const paymentIntentObjet ={reference:formValues.transactionReference, receivingAmount:formValues.amount, sendingAmount:parseInt(formValues.amount) + formValues.fees, paymentIntentId:paymentIntent.id, payerId:formValues.payerId, fee: formValues.fees}

           console.log('Succeed ====>', paymentIntentObjet)
          //  setCardMessage(paymentIntent.id)
                        await axios.post(API_VALIDATE_PAYMENT_INTENT, paymentIntentObjet)
                        .then(response =>{
                          console.log('Confirmation ===>',response.data)
                          if(response.data.status === 'success'){
                            console.log('it succeeded')
                          setLoading(false);
                          setDisabled(true)
                          setError(false);
                          onSuccessfulCheckout()

                          }else{
                            onFailedCheckout()
                          }
                        })
        }
           else if (error) {
            setError(error.message);
            setLoading(false);
            onFailedCheckout()
            return;
        }
        handleReset()

    }catch(error){
        console.error('error from the catch', error.message)
        setError(error.message);
        setLoading(false);
        setDisabled(true)

    }

            dispatch({ type: 'emptyFormValue'});

        setLoading(false);
        // onSuccessfulCheckout()
    }

  return (
    <Box className={classes.layout} display={{ xs:'block' }} sm={12}>

          <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
            <GetStepContent step={activeStep} />
            <Grid >
                  {error && <p style={{ color:'red'}}>{error}</p>}
                  {activeStep !== 0 &&
                    (
                      <Button style={{width:'100%'}} onClick={handleBack} className={classes.buttons}>
                        Back
                      </Button>
                    )
                  }
                  <Button
                    className={classes.button}
                    type="submit"
                    disabled={loading||disabled}

                    style={{backgroundColor:backgroundChanger(),  width:'100%', height:50, marginTop:5, color:loading? 'black':'white'}}
                  >
                    { loading ? 'Processing...' :
                      activeStep === steps.length-1  ?  'Pay now' : 'Next'
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

export default FormManager
