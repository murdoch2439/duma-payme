import React from "react";
import {  useHistory
} from "react-router-dom";
import { Container, Paper, Box, Grid } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';
// import Checkout from "./stripe/checkout";
import FormManager from './stripe/checkout'
import { useStateValue } from "../context";
// import axios from 'axios'
// import LoadingComponent from "../components/loadingComponent";
// import wilbo from '../../public/cards'
// import {
//   useParams
// } from "react-router-dom";

const useStyles = makeStyles(() => ({

    container: {
        // backgroundColor:'#F1F9FE',
        backgroundColor:'white',
        // backgroundImage:`url(https://cdn.goodao.net/easypetgarden/H6dd2a1363c0042738024ab6ee5ffb470G.jpg)`,
        height:'100%',
        borderRadius:10,
        margin:'auto',
        marginTop:'7%',
        display:'flex',
    },
    coverSection:{
      // height:500,
      // backgroundColor:'purple',
      width:'85%',
      borderRadius:10,
      textAlign:'center'
    },
    image:{
      //  height:'100%',
        marginTop:100,
        // alignSelf:'center',
        width:'70%',
        // justifyContent:'center',
    }
}));

const Main = () => {
    const classes = useStyles();

    const history = useHistory()
       const [{ formValues }, dispatch] = useStateValue();
   


      

          const cardsLogo = [
        "amex",
        "cirrus",
        // "diners",
        // "dankort",
        // "discover",
        // "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    return (
      <>
             <Container maxWidth="md" alignItems='center' >
            <Paper elevation={3}  className={classes.container} >
              <Box className={classes.coverSection} display={{ xs: 'none',sm:'inline', md:'block' }} m={1} >
                <div style={{backgroundColor:'#E1E2E3', height:'100%', justifyContent:'center', alignItems:'center', borderTopLeftRadius:10,
        borderBottomLeftRadius:10,}} >
              {
              formValues.receiverLogo === '' ? 'Loading':
              <img src={`https://yayo-resources.s3.eu-west-1.amazonaws.com/icash/me/resources/${formValues.receiverLogo}/client-logo.png`} alt='logo'  className={classes.image} />
              }
              
              <Grid item xs={12} sm={12} md={12} style={{marginTop:50}} >
                {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="40px" align="bottom" style={{ padding: "0 5px" }} />)}
                
            </Grid>
                </div>
              </Box>
              
                <FormManager onSuccessfulCheckout ={()=> history.replace('/success')} onFailedCheckout ={()=>history.replace('/failure')} />

            </Paper>
        </Container>

      </>
    
    )
}

export default Main;