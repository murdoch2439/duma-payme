import React, {useState, useEffect} from 'react';
import {Grid,Typography, TextField, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useStateValue } from '../context';
import {
    getUrlParams, getUrlPath,

} from '../utils/helperFunctions';
import {
    ADMIN_ID_STRING,
    API_PAYMENT_INIT,
    DEBIT_CARD,
    EDIT_FORM_VALUES,
    MOBILE_MONEY,
    PAYER_ID_STRING
} from '../constants/variableNames';
import localLogo from '../assets/test4.svg'


const useStyles = makeStyles({
  input:{
      borderWidth:0.3,
      borderColor:'yellow',
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',

  },
  button: {
    height:50,
    color:'white'
  },
});

const paymentMethod =[
    {
        value:DEBIT_CARD,
        label:'Debit card',
    },
    {
        value:MOBILE_MONEY,
        label:'Mobile Money',
    },
]


const FormStepOne =()=> {
    const classes = useStyles();
    const [{ formValues }, dispatch] = useStateValue();
    const [currency, setCurrency] = useState('')
    // const [errors, setErrors] = useState({})
    const [errorName, setErrorName] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const mailFormatVerifer = (email) =>{

        return emailFormat.test(email)

    }


    const [paymentMeth, setPaymentMeth] = useState('')


     const adminId = getUrlParams()[ADMIN_ID_STRING]
     const  payerId = getUrlParams()[PAYER_ID_STRING]
     formValues.receiverEmail = adminId
     formValues.payerId = payerId
    const path = getUrlPath()

    const checkUrl = () =>{
        if(adminId && payerId){
            console.log('Call the first method')
        }else if(path){
            console.log("Call the second method")
        }
    }

    checkUrl()

     const receivingAmount = (formValues.currency === 'usd' ? formValues.amount : parseInt(formValues.amount) * parseFloat(formValues.rate))


  useEffect(()=>{
      if(formValues.currency === ''){
          getIpAdress()
      }else{
          setCurrency(formValues.currency)
          setPaymentMeth(formValues.paymentMethod)
      }


    },[formValues.currency, formValues.paymentMethod])

const getIpAdress = () =>{

    try{

            const paymentInfo = {  adminId, payerId }

            axios.post(API_PAYMENT_INIT, paymentInfo).then(  (response)=>{
                console.log('response Data ====>', response.data)
                setCurrency(response.data.currency)
                formValues.currency = response.data.currency
                formValues.rate = response.data.rate
                formValues.transactionReference = response.data.reference
                formValues.receiverLogo = response.data.clientLogo
                formValues.receiverName = response.data.clientName
                if(response.data.payerId){
                    formValues.payerId = response.data.payerId
                }

             })

    }catch(error){
        console.error('Error on payment init : ',error)
        // setCurrency('USD')
        // formValues.currency = 'USD'
        // formValues.rate = '1'
        // formValues.transactionReference = 'hdiiei8783'
        // formValues.receiverLogo = localLogo
        // formValues.receiverName = 'Pierre Gomez'

        }
}

  return (

      <Grid>

      <Grid container spacing={5} style={{ marginTop:0,marginBottom:0}}  >

      <Grid item  xs={12} >
            <Typography variant="h6">Payer Information</Typography>
        </Grid>
      <Grid item xs={12} sm={4} md={6} >
            <TextField
            inputProps={{className:classes.input}}
                label="Name on the card"

                name="name"
                variant="outlined"
                required
                fullWidth
                // helperText={errorName? 'this field cannot be empty':null}
                value={formValues.name}
                onChange={e =>{
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "name",
                        value: e.target.value
                    })
                    // if(e.target.value === ''){
                    //     setErrorName(true)
                    // }else{
                    //     setErrorName(false)
                    // }
                }






                }
            />
          </Grid>

        <Grid item xs={12} sm={4} md={6}>
            <TextField
                label="Email adress"
                name="email"

                variant="outlined"
                type="email"
                required
                fullWidth
                error={errorName}
                helperText={ errorName ? `${errorMessage}`:null}
                value={formValues.email}
                onChange={e =>{
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "email",
                        value: e.target.value
                    })
                    if(!emailFormat.test(e.target.value)){
                        setErrorName(true)
                        setErrorMessage('mail not valid')

                    }else{
                        setErrorName(false)
                    }
                }

                }
            />
        </Grid>
        <Grid item xs={12} sm={4} md={6}>
            <TextField
                label="Phone Number"
                name="phone"
                variant="outlined"
                type="tel"
                required
                fullWidth
                value={formValues.phone}
                onChange={e =>{
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "phone",
                        value: e.target.value
                    })
                }

                }
            />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
           <FormControl
           required

           style={{minWidth: '100%',}}>
        <TextField
          label="Currency"
          select
          name="currency"
          variant="outlined"
          required
          disabled
          value={currency}
          onChange={(e) => {
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "currency",
                        value: e.target.value.currency
                    })
                }}


        >
          <MenuItem value='USD'>{currency}</MenuItem>
          <MenuItem value='EUR'>{currency}</MenuItem>
          <MenuItem value='CAD'>{currency}</MenuItem>
          <MenuItem value='GBP'>{currency}</MenuItem>
        </TextField>
      </FormControl>

        </Grid>

        <Grid item xs={12} sm={6} md={6}>
        <FormControl
           style={{minWidth: '100%',}}>
            <TextField
                required
                variant="outlined"
                select
                label="Payment method"
                value={formValues.paymentMethod === '' ? paymentMeth : formValues.paymentMethod}
                onChange={(e) => {
                            setPaymentMeth(e.target.value)
                            formValues.paymentMethod = e.target.value
                            // console.log('payment methode ...',formValues.paymentMethod)
                        }}
        >
          {paymentMethod.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </FormControl>

        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <TextField
                label="Amount"
                name="amount"
                variant="outlined"
                required
                type="number"
                fullWidth
                value={formValues.amount}
                onChange={e => {
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "amount",
                        value: e.target.value.replace(/[^0-9,.]/g, ''),

                    })
                }


                }
            />
        </Grid>
         <Grid item xs={12} sm={6} md={3}>
            <TextField
                label={`Receive`}
                name="received"
                variant="outlined"
                required
                disabled
                type="number"
                fullWidth
                value={receivingAmount}
                onChange={e =>{
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "received",
                        value: e.target.value.replace(/[^0-9,.]/g, '')
                    })
                }

                }
            />
        </Grid>

       </Grid>



   </Grid>



  );
}

export default FormStepOne
