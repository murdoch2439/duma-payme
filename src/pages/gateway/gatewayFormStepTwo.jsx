import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStateValue } from '../../context';
import '../../constants/styles/cardSectionStyles.css'
// import { businessLogicManager, nameFormating } from '../utils/helperFunctions';
import {TextField} from "@material-ui/core";
import {DEBIT_CARD, EDIT_FORM_VALUES} from "../../constants/variableNames";
import {useTranslation} from "react-i18next";
import {totalToPay} from "../../utils/helperFunctions";

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
    title: {
    },
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
            <Grid  style={{ width:'100%', display:'flex'}} >

                <Grid item xs={12} sm={12} md={12} style={{padding:'0 5px 0 5px'}}>
                    <Grid item  xs={12}>
                        <Typography variant="h6">{t("Payment Details")}</Typography>
                    </Grid>
                    <List>
                        <ListItem className={classes.listItem} >
                            <ListItemText primary={t('Currency :')} style={{fontWeight:'800', color:'black'}}  />
                            <Typography variant="body1" style={{fontWeight:'500'}}>{formValues.currency}</Typography>
                        </ListItem>
                        <ListItem className={classes.listItem} style={{backgroundColor:'#F1F5F6',  borderRadius:5,}} >
                            <ListItemText primary={t('Total :')} style={{fontWeight:'800', color:'black'}}  />
                            <Typography variant="body1" style={{fontWeight:'500'}}>{totalToPay(businessObject)}</Typography>
                        </ListItem>
                    </List>
                </Grid>

            </Grid>
            <div style={{height:1, marginTop:10, width:'96%',marginRight:10,marginLeft:10,  backgroundColor:'#C4C4C4'}}/>

            <Grid style={{marginRight:10,marginLeft:10,}}  >
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
                                        required
                                        fullWidth
                                        value={formValues.receiver}
                                        onChange={e =>
                                            dispatch({
                                                type: EDIT_FORM_VALUES,
                                                key: "receiver",
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
