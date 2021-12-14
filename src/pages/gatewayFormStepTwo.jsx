import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStateValue } from '../context';
import '../constants/styles/cardSectionStyles.css'
// import { currencyManager, nameFormating } from '../utils/helperFunctions';
import {TextField} from "@material-ui/core";
import {DEBIT_CARD, EDIT_FORM_VALUES} from "../constants/variableNames";


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
const useStyles = makeStyles((theme) => ({
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
    const fees = parseInt(formValues.fees)

    const total = parseInt(formValues.amount) + fees

    return (

        <Grid  spacing={3}>
            <Grid  style={{ width:'100%', display:'flex'}} >

                <Grid item xs={12} sm={12} md={12} style={{padding:'0 5px 0 5px'}}>
                    <Grid item  xs={12} style={{paddingTop:20}} >
                        <Typography style ={{fontSize:16, fontWeight:'bold'}}>Payment details</Typography>
                    </Grid>
                    <List>
                        <ListItem className={classes.listItem} >
                            <ListItemText primary='Currency:' style={{fontWeight:'800', color:'black'}}  />
                            <Typography variant="body1" style={{fontWeight:'500'}}>{formValues.currency}</Typography>
                        </ListItem>
                        <ListItem className={classes.listItem} >
                            <ListItemText primary='Total:' style={{fontWeight:'800', color:'black'}}  />
                            <Typography variant="body1" style={{fontWeight:'500'}}>{`${parseInt(formValues.amount).toFixed(2)} $`}</Typography>
                        </ListItem>

                    </List>

                </Grid>

            </Grid>
            {/*<div style={{height:0.1, marginTop:10, backgroundColor:'#C4C4C4'}}/>*/}

            <Typography style ={{fontSize:16, paddingTop:20, fontWeight:'bold'}} gutterbottom={"true"}>
                {formValues.paymentMethod === DEBIT_CARD ?
                    "Card Information" :
                    "Mobile money Information"
                }

            </Typography>
            <Grid container spacing={3} >

                <Grid item  xs={12} sm={12} >
                    {
                        formValues.paymentMethod === DEBIT_CARD ?
                            <CardElement onChange={handleChange}  options={CARD_ELEMENT_OPTIONS}  />:
                            <Grid item container spacing={5} style={{marginTop:5, display:'flex'}}>
                                {/*<Grid item xs={12} sm={4} md={6} >*/}
                                {/*    <TextField*/}
                                {/*        inputProps={{className:classes.input}}*/}
                                {/*        label="Mobile account name"*/}
                                {/*        name="name"*/}
                                {/*        variant="outlined"*/}
                                {/*        required*/}
                                {/*        fullWidth*/}
                                {/*        value={formValues.name}*/}
                                {/*        onChange={e =>*/}
                                {/*            dispatch({*/}
                                {/*                type: 'editFormValue',*/}
                                {/*                key: "name",*/}
                                {/*                value: e.target.value*/}
                                {/*            })*/}
                                {/*        }*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        label="Mobile Money Number"
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
                {error && <p style={{color:'red'}}>{error}</p>}

            </Grid>
        </Grid>
    );
}

export default GatewayFormStepTwo
