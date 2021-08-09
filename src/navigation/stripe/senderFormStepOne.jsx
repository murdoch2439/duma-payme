import React, {useState, useEffect} from 'react';
import {Grid,Typography, TextField, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useStateValue } from '../../context';
import { getUrlParams, 
    // transformToUpCase, 
} from './helperFunctions';
import { ADMIN_ID_STRING, API_PAYMENT_INIT, PAYER_ID_STRING } from './variableNames';

// import {
//   useParams
// } from "react-router-dom";


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
        value:'debit card',
        label:'Debit card'
    },
    // {
    //     value:'mobile money',
    //     label:'Mobile money'
    // }
]
// const CurrencyList =[
//     {
//         value:'usd',
//         label:'USD'
//     },
//     {
//         value:'eur',
//         label:'EUR'
//     },
//     {
//         value:'cad',
//         label:'CAD'
//     },
//     {
//         value:'gbp',
//         label:'GBP'
//     }
// ]

const SenderFormStepOne =()=> {
    const classes = useStyles();
    const [{ formValues }, dispatch] = useStateValue();
    const [currency, setCurrency] = useState('')
    // const [clientIpAdress, setClientIpAdress] = useState({});
    // const [logo, setLogo] = useState('')
    // const [receiverName, setReceiverName] = useState('')
    // const [paymentMet, setPaymentMet] = useState('debit card')
    const [paymentMeth, setPaymentMeth] = useState('')
    // let { adminId, payerId } = useParams();

     const adminId = getUrlParams()[ADMIN_ID_STRING]
     const  payerId = getUrlParams()[PAYER_ID_STRING]
     formValues.receiverEmail = adminId
     formValues.payerId = payerId


  useEffect(()=>{
      if(formValues.currency === ''){
          getIpAdress()
      }else{
          setCurrency(formValues.currency)
          setPaymentMeth(formValues.paymentMethod)
      }


    },[])

const getIpAdress = () =>{

    try{
        //   axios.get('https://geolocation-db.com/json')
        //  .then((response)=>{
            // setClientIpAdress(response.data.IPv4)
            // formValues.ip = response.data.IPv4
            const paymentInfo = {  adminId, payerId }
            // console.log('payment Info ====>', paymentInfo)
            axios.post(API_PAYMENT_INIT, paymentInfo).then(  (response)=>{
                console.log('response Data ====>', response.data)
                setCurrency(response.data.currency)
                formValues.currency = response.data.currency
                // console.log('currency ===>', response.data.currency)
                // console.log('currency from formValues', formValues.currency)
                formValues.rate = response.data.rate
                formValues.transactionReference = response.data.reference
                formValues.receiverLogo = response.data.clientLogo
                formValues.receiverName = response.data.clientName
                // formValues.receiver = response.data.receiver
                // formValues.receiver_logo = response.data.logo
             })
        // }
        // )

    }catch(error){
        console.error(error)
        console.log('it works not!')
        }
}

  return (
  
      <Grid   style={{display:'flex', justifyContent:'space-between' }}>

      <Grid container spacing={5} style={{ marginTop:0,marginBottom:0}}  >

      <Grid item  xs={12} >
            <Typography variant="h6">Contact Information</Typography>
        </Grid>
      <Grid item xs={12} sm={4} md={6} >
            <TextField
            inputProps={{className:classes.input}}
                // InputLabelProps={{className:classes.textfiel_label}}
                label="Name on the card"
                name="name"
                variant="outlined"
                required
                fullWidth
                value={formValues.name}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "name",
                        value: e.target.value
                    })
                }
            />
          </Grid>
      
        <Grid item xs={12} sm={4} md={6}>
            <TextField
                label="Email adress"
                name="email"
                variant="outlined"
                required
                fullWidth
                value={formValues.email}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "email",
                        value: e.target.value
                    })
                }
            />
        </Grid>
        <Grid item xs={12} sm={4} md={6}>
            <TextField
                label="Phone Number"
                name="phone"
                variant="outlined"
                required
                fullWidth
                value={formValues.phone}
                onChange={e =>
                    dispatch({
                        type: 'editFormValue',
                        key: "phone",
                        value: e.target.value
                    })
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
                        type: "editFormValue",
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
            {/* <Autocomplete
                options={currencies}
                // getOptionLabel={option => option.code}
                renderOption={option => <> {option.code}</>}
                renderInput={params =>
                    <TextField
                        label="Currency"
                        name="currency"
                        variant="standard"
                        fullWidth
                        required
                        {...params}
                    />
                }
                value={formValues.currency.code}
                onChange={(event, value) => {
                    dispatch({
                        type: "editFormValue",
                        key: "currency",
                        value:  value
                    })
                }}
            /> */}
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6}> */}
           {/* <FormControl 
           required
           
           style={{minWidth: '100%',}}>
        <InputLabel >Payment method</InputLabel>
        <Select
          label="paymentMethod"
          name="paymentMethod"
          variant="outlined"
          required
          value={formValues.paymentMethod}
          onChange={(e) => {
                    dispatch({
                        type: "editFormValue",
                        key: "paymentMethod",
                        value: e.target.value
                    })
                }}
          
        >
          <MenuItem value='Debit card'>Debit card</MenuItem>
          <MenuItem value='Mobile money'>Mobile money</MenuItem>
           <MenuItem value='cad'>{makeCurrencyMaj(currency)}</MenuItem>
          <MenuItem value='gbp'>{makeCurrencyMaj(currency)}</MenuItem>
          
        </Select> 
      </FormControl> */}
           
        {/* </Grid> */}
        <Grid item xs={12} sm={6} md={6}>
        <FormControl 
           style={{minWidth: '100%',}}>
            <TextField
                required
                variant="outlined"
                select
                label="Payment method"
                value={paymentMeth}
                onChange={(e) => {
                            setPaymentMeth(e.target.value)
                            formValues.paymentMethod = e.target.values
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
                onChange={e =>
                    
                    dispatch({
                        type: "editFormValue",
                        key: "amount",
                        value: e.target.value.replace(/[^0-9,.]/g, ''),
                        
                    })
                }
            />
        </Grid>
         <Grid item xs={12} sm={6} md={3}>
            <TextField
                label={`Received`}
                name="received"
                variant="outlined"
                required
                disabled
                type="number"
                fullWidth
                value={formValues.currency === 'usd' ? formValues.amount : parseInt(formValues.amount) * parseFloat(formValues.rate)}
                onChange={e =>
                    dispatch({
                        type: "editFormValue",
                        key: "received",
                        value: e.target.value.replace(/[^0-9,.]/g, '')
                    })
                }
            />
        </Grid>

       </Grid>
      

        
   </Grid>
      

    
  );
}

export default SenderFormStepOne