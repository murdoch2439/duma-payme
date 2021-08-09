import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Box, Button, Grid} from '@material-ui/core'
// import AddressForm from './adressForm';
// import PaymentForm from './paymentForm';
// import Review from './review';
// import checkoutForm from '../checkoutForm';
// import { useStateValue } from "../../StateContext/";
import {useStripe} from '@stripe/react-stripe-js';
import axios from 'axios'
//  import { useFormik } from 'formik';
//  import * as Yup from 'yup';
import SenderFormStepOne from './senderFormStepOne';
import ReviewAndPayForm from './reviewAndPayForm';
import Copyright from './copyright';
import { useStateValue } from '../../context';
// import {
//   useParams
// } from "react-router-dom";
// import { urlParamsFormater } from './helperFunctions';
import { API_CREATE_PAYMENT_INTENT, API_VALIDATE_PAYMENT_INTENT } from './variableNames';
import FormikComponent from './formik';





const useStyles = makeStyles(() => ({
  layout: {

        width:'100%',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10
        // paddingTop:10,
  },
  form: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    // backgroundColor:'green',
    // height:'80%'
  },
  buttons: {
    height:50,
    // justifyContent: 'flex-end',
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
      return <SenderFormStepOne />;
      // return <FormikComponent />
    case 1:
      return <ReviewAndPayForm />;
    default:
      throw new Error('Unknown step');
  }
}

const  FormManager =({onSuccessfulCheckout, onFailedCheckout}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [{ formValues }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false)
  // const [result, setResult] = useState({});
  // const [currency, setCurrency] = useState('')
  // const [cardMessage, setCardMessage] = useState("");
  // const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);


  const backgroundChanger = () =>{
    if(!loading){
      return '#009CDE'
    }else{
      return '#F5F5F5'
    }
  }

    const stripe = useStripe();


  const handleNext = () => {
    if(activeStep === 1){
      capture()
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
  // const initialValues = {
  //   name:'',
  //   email:'',
  //   phone:'',
  // }
    //   const  validationSchema = Yup.object({
    //    name: Yup.string()
    //      .max(15, 'Must be 15 characters or less')
    //      .required('Required'),
    //    phone: Yup.string().min(10)
    //      .max(10, 'Must be 10 characters or less')
    //      .required('Required'),
    //    email: Yup.string().email('Invalid email address').required('Required'),
    //  })
    //    const formik = useFormik({
    //      initialValues:initialValues,
    //      validationSchema:validationSchema,
    //           onSubmit: values => {
    //             handleSubmit()
    //   //  alert(JSON.stringify(values, null, 2));
    //  },

       
    //  })

   const capture = async () => {



        setLoading(true);

        const billingDetails = {
        email:formValues.email,
        name:formValues.name,
        phone:formValues.phone,
     
        }

    try{


        const {data:clientSecret} = await axios.post(API_CREATE_PAYMENT_INTENT, {amount:formValues.amount , currency:formValues.currency, receipt_email:formValues.receiverEmail} )
        // console.log('ClientSecret: ==>',paymentIntents)
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
            // payment_method:paymentMethodReq.
        })
        console.log(paymentIntent)

        // setCardMessage(`${paymentMethodReq.paymentMethod.id}`)
        // setLoading(false)
        setError(false);
        setDisabled(true)
        

         if (paymentIntent && paymentIntent.status === "succeeded") {
           formValues.paymentIntent = paymentIntent.id
           const paymentIntentObjet ={reference:formValues.transactionReference, sendingAmount:formValues.amount, receivingAmount:parseInt(formValues.amount) + formValues.fees, paymentIntentId:paymentIntent.id, payerId:formValues.payerId, fee: formValues.fees}

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
                    // console.log('it succeeded')
                    //       setLoading(false);
                    //       setDisabled(true)
                    //       setError(false);
                    //       onSuccessfulCheckout()
            
         
            // return;
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
  //       // const clientSecretDataObject = clientSecretDataObjectConverter(formValues);
  //       // const clientSecret = await clientSecretPull(clientSecretDataObject);
  //       // const cardElement = elements.getElement(CardCvcElement);
  //       // const stripeDataObject = stripeDataObjectConverter(formValues, cardElement);
  //       // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, stripeDataObject);

  //       // if (error) {
  //       //     setCardStatus(false);
  //       //     setCardMessage(error.message)
  //       // } else if (paymentIntent && paymentIntent.status === "succeeded") {
  //       //     setCardStatus(true);
  //       //     setCardMessage("");
            dispatch({ type: 'emptyFormValue'});
        // }
        // setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                   
                    {/* {cardMessage && <p style={{ color:'black'}}> Congratulations, your payment is successfully done. PaymentID: 
            <a href={`https://js.stripe.com/v1/payment_intents/:${cardMessage}`}>{` ${cardMessage}`}</a>
            
            </p>} */}

            {/* {succeeded && <p>{succeeded}</p>} */}

                </form>
        <Grid style={{ marginTop:10}}>

        <Copyright />
        </Grid>

                

    </Box>
  );
}

export default FormManager