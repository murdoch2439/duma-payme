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
import { currencyManager, nameFormating } from '../utils/helperFunctions';


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



const  FormStepTwo =()=> {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [{ formValues }, dispatch] = useStateValue();

      const stripe = useStripe();
      const elements = useElements();


    const handleChange = async(event) =>{


    setDisabled(event.empty);
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
        {/* <Grid xs={12} sm={12} md={4} >

            <img src={formValues.receiver_logo} alt='logo'  width={'100%'}/>
        </Grid> */}
        <Grid xs={12} sm={12} md={12} style={{padding:'0 5px 0 5px'}}>
          <Grid item  xs={12} style={{paddingTop:20}} >
            <Typography style ={{fontSize:16, fontWeight:'bold'}}>Payment details</Typography>
        </Grid>


      <List disablePadding >
          <ListItem className={classes.listItem} >
            <ListItemText primary='Sender:' style={{fontWeight:'700', color:'grey'}}  />
            <Typography variant="body1" style={{fontWeight:'500'}}>{nameFormating(formValues.name)}</Typography>
          </ListItem>
          <ListItem className={classes.listItem} >
            <ListItemText primary='Receiver:' style={{fontWeight:'700', color:'grey'}} />
            <Typography variant="body1" style={{fontWeight:'500'}}>{nameFormating(formValues.receiverName)}</Typography>
          </ListItem>
          <ListItem className={classes.listItem} >
            <ListItemText primary='Amount to send:' style={{fontWeight:'700', color:'grey'}} />
            <Typography variant="body1">{`${currencyManager(formValues.currency, formValues.amount)}.00`}</Typography>
          </ListItem>
          <ListItem className={classes.listItem} >
            <ListItemText primary='Fees:' style={{fontWeight:'700', color:'grey'}} />
            <Typography variant="body1">{`${currencyManager(formValues.currency, fees )}.00`}</Typography>
          </ListItem>
         { formValues.currency === 'eur'? <ListItem className={classes.listItem} >
            <ListItemText primary='Rate:' style={{fontWeight:'700', color:'grey'}} />
            <Typography variant="body1">{currencyManager(formValues.currency, formValues.rate )}</Typography>
          </ListItem>:null}


        <ListItem className={classes.listItem} style={{backgroundColor:'#F1F5F6',  borderRadius:5,}}>
          <ListItemText  primary="Total:" className={classes.total}/>
          <Typography variant="subtitle1" className={classes.total}>
         {` ${currencyManager(formValues.currency, total )}.00 ${formValues.currency}`}
          </Typography>
        </ListItem>
      </List>
        </Grid>

            </Grid>

      <Typography style ={{fontSize:16, paddingTop:20, fontWeight:'bold'}} gutterBottom>
        Card details
      </Typography>
      <Grid spacing={3} >

        <Grid  xs={12} sm={12} >

        <CardElement onChange={handleChange}  options={CARD_ELEMENT_OPTIONS}  />
        </Grid>
        {error && <p style={{color:'red'}}>{error}</p>}

      </Grid>
    </Grid>
  );
}

export default FormStepTwo