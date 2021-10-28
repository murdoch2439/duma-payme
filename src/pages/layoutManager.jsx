import React,{useState, useEffect} from "react";
import {  useHistory
} from "react-router-dom";
import { Container, Paper, Box, Grid } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';

import FormManager from './formStepsManager'
import { useStateValue } from "../context";
import cover from '../assets/dumaLogo.png'

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

      width:'85%',
      borderRadius:10,
        // backgroundImage:`url(${cover})` ,
      textAlign:'center'
    },
    image:{
        marginTop:100,
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
             <Container maxWidth="md" alignItems='center' >
            <Paper elevation={3}  className={classes.container} >
              <Box className={classes.coverSection} display={{ xs: 'none',sm:'inline', md:'block' }} m={1} >
                <div style={{backgroundColor:'#FBB900', backgroundImage:`url(${cover})`, height:'100%',  borderTopLeftRadius:10,
        borderBottomLeftRadius:10,}} >
                    <img src={cover} alt='logo' className={classes.image} />
              {/*{*/}
              {/*formValues.receiverLogo === '' ? 'Loading...':*/}
              {/*<img src={`https://yayo-resources.s3.eu-west-1.amazonaws.com/icash/me/resources/${logo}/client-logo.png`} alt='logo'  className={classes.image} />*/}
              {/* }*/}

              <Grid item xs={12} sm={12} md={12} style={{marginTop:50}} >
                {cardsLogo.map(e => <img key={e} src={`./cards/${e}.png`} alt={e} width="40px" style={{ padding: "0 5px" }} />)}

            </Grid>
                </div>
              </Box>

                <FormManager onSuccessfulCheckout ={()=> history.replace('/success')} onFailedCheckout ={()=>history.replace('/failure')} />

            </Paper>
        </Container>

      </>

    )
}

export default LayoutManager;
