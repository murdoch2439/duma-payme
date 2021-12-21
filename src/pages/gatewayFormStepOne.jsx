import React, {useState, useEffect} from 'react';
import {Grid,Typography, TextField, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useStateValue } from '../context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
    getUrlParams,

} from '../utils/helperFunctions';
import {
    ADMIN_ID_STRING,
    API_PAYMENT_INIT,
    DEBIT_CARD,
    EDIT_FORM_VALUES,
    MOBILE_MONEY,
    PAYER_ID_STRING
} from '../constants/variableNames';
// import localLogo from '../assets/test4.svg'
import ListItemText from "@material-ui/core/ListItemText";


const useStyles = makeStyles({
    input:{
        borderWidth:0.3,
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
    listItem: {
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
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    const [paymentMeth, setPaymentMeth] = useState('')


    const adminId = getUrlParams()[ADMIN_ID_STRING]
    const  payerId = getUrlParams()[PAYER_ID_STRING]
    formValues.receiverEmail = adminId


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
            return `${parseInt(amount).toFixed(2)} $`

    }

    const paymentInitialization = async() =>{

        try{
            const paymentInfo = {  adminId, payerId }

            await axios.post(API_PAYMENT_INIT, paymentInfo).then(   (response)=>{
                console.log('response Data ====>', response.data)
                setCurrency(response.data.adminCurrency)
                setAmount(response.data.amount)
                formValues.senderExist = response.data.senderExist
                formValues.callbackUrl = response.data.cbUrl

                formValues.currency = response.data.currency
                console.log(formValues.receiverLogo)
                formValues.amount = response.data.amount
                formValues.rate = response.data.rate
                formValues.transactionReference = response.data.reference
                formValues.receiverLogo = response.data.clientLogo
                formValues.receiverName = response.data.clientName
                formValues.payerId = response.data.payerId


            })

        }catch(error){
            console.error('Error on payment init : ',error)

        }
    }

    return (

        <Grid>

            <Grid container spacing={5} style={{ marginTop:0,marginBottom:0}}  >


                <Grid item  xs={12} >
                    <Typography variant="h6">Payment Information</Typography>
                    <List>
                        <ListItem className={classes.listItem} >
                            <ListItemText primary='Currency:' style={{fontWeight:'800', color:'black'}}  />
                            <Typography variant="body1" style={{fontWeight:'500'}}>{currencyManager()}</Typography>
                        </ListItem>
                        <ListItem className={classes.listItem} >
                            <ListItemText primary='Total:' style={{fontWeight:'800', color:'black'}}  />
                            <Typography variant="body1" style={{fontWeight:'500'}}>{amountManager()}</Typography>
                        </ListItem>

                    </List>
                </Grid>
                <Grid item xs={12} sm={4} md={6} >
                    <TextField
                        inputProps={{className:classes.input}}
                        label="Name on the card"
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

                <Grid item xs={12} sm={6} md={12}>
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



            </Grid>


        </Grid>



    );
}

export default GatewayFormStepOne
