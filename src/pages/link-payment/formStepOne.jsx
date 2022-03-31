import React, {useState, useEffect} from 'react';
import {Grid,Typography, TextField, FormControl, MenuItem  } from '@material-ui/core';
import { useStateValue } from '../../context';
import { paymentMethods,} from '../../utils/helperFunctions';
import {EDIT_FORM_VALUES,} from '../../constants/variableNames';
import {useTranslation} from "react-i18next";


const FormStepOne =()=> {
    const [{ formValues }, dispatch] = useStateValue();
    const [currency, setCurrency] = useState('')
    const [clientCurrency, setClientCurrency] = useState('')
    const [paymentMeth, setPaymentMeth] = useState('')
    const [errorName, setErrorName] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const {t} = useTranslation()

    // if(paymentRequestId){
    //     formValues.payerId = paymentRequestId
    // }

  const receivingAmount = (formValues.clientCurrency === formValues.currency ? formValues.amount : (parseInt(formValues.amount) * parseFloat(formValues.rate)).toFixed(2))
  useEffect(()=>{
          setCurrency(formValues.currency)
          setPaymentMeth(formValues.paymentMethod)
          setClientCurrency(formValues.clientCurrency)

    },[formValues.currency, formValues.paymentMethod, formValues.clientCurrency])

// const paymentInitWithBff = async () =>{
//     try{
//         if(ip){

//             if(merchantKey){
//                 const responseFromBffPaymentInit = await axios.post(API_PAYMENT_INIT, paymentInfo)

//
//                 if((responseFromBffPaymentInit.data.error && responseFromBffPaymentInit.data.code === CODE_403)|| responseFromBffPaymentInit.data.code === CODE_500){
//                     console.log("response data from init ==> ", responseFromBffPaymentInit.data)

//                 }else{
//                     console.log('initialization succeed ====>', responseFromBffPaymentInit.data)
//                     responseManager({response :responseFromBffPaymentInit, formValues})
//                 }
//
//             }
//         }
//     }catch(error){
//         }
// }

  return (
      <Grid>
          <Grid item   xs={12} style={{display:'flex', justifyContent:'space-between'}} >
              <Typography variant="h6">{t("Payer Information")}</Typography>
          </Grid>
      <Grid container spacing={5} style={{ marginTop:0 ,marginBottom:0}}  >
      <Grid  item xs={12} sm={12} md={6} >
            <TextField
                label={t("Name on the card")}
                name="name"
                variant="outlined"
                required
                fullWidth
                value={formValues.name}
                onChange={e =>{
                    dispatch({
                        type: EDIT_FORM_VALUES,
                        key: "name",
                        value: e.target.value
                    })
                }
                }
            />
          </Grid>

        <Grid item xs={12} sm={6} md={6} >
            <TextField
                label={t("Email address")}
                name="email"
                variant="outlined"
                type="email"
                required
                fullWidth
                error={errorName}
                helperText={ errorName ? `${errorMessage}`:null}
                value={formValues.email.toString()}
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
        <Grid item xs={12} sm={6} md={6}>
            <TextField
                label={t("Phone Number")}
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
           style={{minWidth: '100%',}}
           >
            <TextField
              label={t("Currency")}
              select
              name="currency"
              variant="outlined"
              required
              disabled
              value={currency}
              onChange={(e) => {
                        setCurrency(e.target.value)
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
        <FormControl style={{minWidth: '100%',}}>
            <TextField
                variant="outlined"
                select
                required
                label={t("Payment method")}
                value={formValues.paymentMethod === '' ? paymentMeth : formValues.paymentMethod}
                onChange={(e) => {
                            setPaymentMeth(e.target.value)
                            formValues.paymentMethod = e.target.value
                        }}
        >
          {paymentMethods.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {t(option.label)}
            </MenuItem>
          ))}
        </TextField>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <TextField
                label={t("Amount")}
                name="amount"
                variant="outlined"
                required
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                type="text"
                helperText={`${t("From")} ${currency}`}
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
                label={t(`Receive`)}
                name="received"
                variant="outlined"
                helperText={`${t("To")} ${clientCurrency}`}
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
            {/*<FormHelperText>{`${t("To")} ${currency}`}</FormHelperText>*/}
        </Grid>
       </Grid>
   </Grid>

  );
}

export default FormStepOne
