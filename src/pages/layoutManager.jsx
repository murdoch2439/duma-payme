import React,{useState, useEffect} from "react";
import {  useHistory
} from "react-router-dom";
import { Container, Paper, Box, Grid } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';

import FormManager from './formStepsManager'
import { useStateValue } from "../context";
import cover from '../assets/Trip-assurances (4).png'
import logDuma from '../assets/duma1.png'

const useStyles = makeStyles(() => ({

    container: {
        backgroundColor:'white',
        // backgroundImage:`url(https://cdn.goodao.net/easypetgarden/H6dd2a1363c0042738024ab6ee5ffb470G.jpg)`,
        height:'100%',
        borderRadius:10,
        margin:'auto',
        marginTop:'7%',
        display:'flex',
    },
    imagesBoxWrapper:{
      width:'75%',
      borderRadius:10,


        // backgroundImage:`url(${cover})` ,
      // textAlign:'center'
    },
    imagesBox:{
        // backgroundColor:'red',
        // backgroundImage:`url(${cover})`,
        height:'100%',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,

    },
    logoDuma: {
        width:60,
        // height:200
    },
    clientLogo:{
        // marginTop:50,
        width:'100%',

    }
}));

const LayoutManager = () => {
    const classes = useStyles();
    const history = useHistory()
    const [{ formValues }, dispatch] = useStateValue();
    const [logo, setLogo] = useState('')
    useEffect(()=>{
         if(formValues.receiverLogo === ''){

           console.log('formValues.receiverLogo is empty...')
         }else{
           setLogo(formValues.receiverLogo)
         }
       }, [formValues.receiverLogo])





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
          <Container maxWidth="md" >
                <Paper elevation={3}  className={classes.container} >
                      <Box className={classes.imagesBoxWrapper} display={{ xs: 'none',sm:'inline', md:'block' }} m={1} >
                        <div className={classes.imagesBox}>
                              <img src={logDuma} alt='logo' className={classes.logoDuma} />
                              <div style={{height:300, backgroundColor:'white'}}>

                                  {/*CLIENT LOGO GOES HERE */}
                                  {/*{*/}
                                  {/*formValues.receiverLogo === '' ? 'Loading...':*/}
                                  {/*<img src={`https://yayo-resources.s3.eu-west-1.amazonaws.com/icash/me/resources/${logo}/client-logo.png`} alt='logo'  className={classes.clientLogo} />*/}
                                  {/* }*/}
                                  <img src={cover} alt='logo' className={classes.clientLogo} />
                              </div>




                              <Grid item xs={12} sm={12} md={12} style={{ marginTop:50, textAlign:'center',}} >
                                {cardsLogo.map(card => <img key={card} src={`./cards/${card}.png`} alt={card} width="40px" style={{ padding: "0 5px" }} />)}
                              </Grid>
                        </div>
                      </Box>

                      <FormManager onSuccessfulCheckout ={()=> history.replace('/success')} onFailedCheckout ={()=>history.replace('/failure')} onPendingCheckout={()=>history.replace('/payment-pending')} />
                </Paper>
          </Container>

      </>

    )
}

export default LayoutManager;
