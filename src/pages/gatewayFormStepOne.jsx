import React, {useState, useEffect} from 'react';
import {Grid,Typography, TextField, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useStateValue } from '../context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {getUrlParams, responseManager} from '../utils/helperFunctions';
import {
    MERCHANT_KEY_STRING,
    API_PAYMENT_INIT,
    DEBIT_CARD,
    EDIT_FORM_VALUES,
    MOBILE_MONEY,
    PAYMENT_REQUEST_ID_STRING, CHANGE_MODAL_STATES, SHOW_ACCESS_DENIED_MODAL, OPTION_STRING
} from '../constants/variableNames';
// import localLogo from '../assets/test4.svg'
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles({
    input:{
        borderWidth:0.3,
    },
    listItem: {
        color:'black'
    },
    listItemText:{
        fontWeight:'800',
        color:'black'
    },
    total: {
        fontWeight: 'bold',
        color:'black'
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


const GatewayFormStepOne =()=> {
    const classes = useStyles();
    const [{ formValues }, dispatch] = useStateValue();
    const [currency, setCurrency] = useState('')
    const [amount, setAmount] = useState("1")
    const [errorName, setErrorName] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [paymentMeth, setPaymentMeth] = useState('')
    const {t} = useTranslation()

    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const merchantKey = getUrlParams()[MERCHANT_KEY_STRING]
    const  paymentRequestId = getUrlParams()[PAYMENT_REQUEST_ID_STRING]
    // const option= getUrlParams()[OPTION_STRING]

    useEffect(()=>{
        if(formValues.currency === ''){
            paymentInitialization().then()
        }else{
            setCurrency(formValues.currency)
            setAmount(formValues.amount)
        }

    },[formValues.currency, formValues.amount])

    const currencyManager = () =>{
            return currency
    }

    const amountManager = () =>{
        if(currency === "USD"){
            return `${parseInt(amount).toFixed(2)} $`
        } else{
            return `${parseInt(amount).toFixed(2)} €`
        }

    }

    const paymentInitialization = async() =>{

        try{
            const paymentInfo = {  merchantKey, paymentRequestId }
            if(merchantKey && paymentRequestId){
                await axios.post(API_PAYMENT_INIT, paymentInfo).then(   (response)=>{
                    console.log('response Data ====>', response.data)
                    setCurrency(response.data.currency)
                    setAmount(response.data.amount)
                    if(response.data.error && response.data.code === "403"){
                        dispatch({
                            type: CHANGE_MODAL_STATES,
                            key: SHOW_ACCESS_DENIED_MODAL,
                            value: true
                        })
                    }else{
                        responseManager({response, formValues})
                    }
                })
            }

        }catch(error){
            console.error('Error on the gateway payment init : ',error)
        }
    }

    return (

        <Grid>
            <Grid item  xs={12} >
                <Typography variant="h6">{t("Payment Information")}</Typography>
                <List>
                    <ListItem className={classes.listItem} >
                        <ListItemText primary={t('Currency :')} className={classes.listItemText}  />
                        <Typography variant="body1" style={{fontWeight:'500'}}>{currencyManager()}</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem} style={{backgroundColor:'#F1F5F6',  borderRadius:5,}} >
                        <ListItemText primary={t('Total :')} className={classes.listItemText}  />
                        <Typography variant="body1" style={{fontWeight:'500'}}>{amountManager()}</Typography>
                    </ListItem>

                </List>
                <div style={{height:0.1, marginTop:10, backgroundColor:'#C4C4C4'}}/>
            </Grid>
            <Grid container spacing={5} style={{ marginTop:0,marginBottom:0}}  >
                <Grid item xs={12} sm={4} md={6} >
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

                <Grid item xs={12} sm={4} md={6}>
                    <TextField
                        label={t("Email adress")}
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
                        style={{minWidth: '100%',}}>
                        <TextField
                            required
                            variant="outlined"
                            select
                            label={t("Payment method")}
                            value={formValues.paymentMethod === '' ? paymentMeth : formValues.paymentMethod}
                            onChange={(e) => {
                                setPaymentMeth(e.target.value)
                                formValues.paymentMethod = e.target.value
                            }}
                        >
                            {paymentMethod.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {t(option.label)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                </Grid>
            </Grid>

        </Grid>

    );
}

export default GatewayFormStepOne
