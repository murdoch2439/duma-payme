import React,{useState} from 'react';
import { makeStyles, TextField, Typography, Grid } from '@material-ui/core';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useStateValue } from '../../context';
import '../../constants/styles/cardSectionStyles.css'
// import { businessLogicManager, nameFormating } from '../utils/helperFunctions';
import {DEBIT_CARD, EDIT_FORM_VALUES} from "../../constants/variableNames";
import {useTranslation} from "react-i18next";
import GatewayInfo from "../../components/gateway-info/";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
};
const useStyles = makeStyles(() => ({
    listItem: {
        color:'black'
    },
    total: {
        fontWeight: 'bold',
        color:'black'
    },
    separator:{
        height:1,
        marginTop:10,
        width:'96%',
        marginRight:10,
        marginLeft:10,
        backgroundColor:'#C4C4C4'
    },
    secondSection:{
        marginRight:10,marginLeft:10,
    }
}));


const  GatewayFormStepTwo =()=> {
    const [{ formValues }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const {t} = useTranslation()
    const businessObject = {currency:formValues.currency, clientCurrency:formValues.clientCurrency, amount: formValues.amount, rate:formValues.rate}
    const [error, setError] = useState(null);
    const classes = useStyles();

    const handleChange = async(event) =>{
        // setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }
    formValues.card = elements.getElement(CardElement)
    if (!stripe || !elements) {
        // setCardMessage('Stripe has not yet loaded')
        return ;
    }

    return (
        <Grid >
            <GatewayInfo currency={formValues.currency} businessObject={businessObject} />

            <div className={classes.separator} />

            <Grid className={classes.secondSection}>
                <Typography style ={{fontSize:16, paddingTop:20, fontWeight:'bold'}}>
                    {formValues.paymentMethod === DEBIT_CARD ?
                        t("Card Information") :
                        t("Mobile money Information")
                    }

                </Typography>
                <Grid item  xs={12} sm={12} >
                    {
                        formValues.paymentMethod === DEBIT_CARD ?
                            <CardElement onChange={handleChange}  options={CARD_ELEMENT_OPTIONS}  />:
                            <Grid item container style={{marginTop:5, display:'flex'}}>

                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label={t("Mobile Money Number")}
                                        name="receiver"
                                        variant="outlined"
                                        type="tel"
                                        maxLength="20"
                                        required
                                        fullWidth
                                        value={formValues.phone}
                                        onChange={e =>
                                            dispatch({
                                                type: EDIT_FORM_VALUES,
                                                key: "phone",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </Grid>
                            </Grid>

                    }

                </Grid>
                <p style={{color:'red'}}>{error ? error :null}</p>

            </Grid>
        </Grid>
    );
}

export default GatewayFormStepTwo
