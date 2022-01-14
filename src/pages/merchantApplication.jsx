import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid,
} from "@material-ui/core";

import { makeStyles, } from '@material-ui/core/styles';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import Zoom from '@material-ui/core/Zoom';



const useStyles = makeStyles(() => ({
    boxWrapper: {
        width:450,
        height:640,
        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    paper: {
        height:500,
        backgroundColor:'white',
        marginTop:80,
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxTitle:{
        backgroundColor:'#FBB900',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxIcon:{
        height:100,
        width:100,
        backgroundColor:'#FBB900',
        margin:'auto',
        borderRadius:50,
    }
}));


const MerchantApplication =()=>{

    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        handleChange()
    },[])

    const handleChange = () => {
        setChecked(true);
    };

    return(
        <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container className={classes.boxWrapper}>
                <Paper className={classes.paper}>
                    <Grid container  justifyContent='center' className={classes.boxTitle}>
                        <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >Checkout</p>
                    </Grid>
                    <div style={{height:40}} />
                    <Grid  item className={classes.boxIcon}>
                        <ShoppingCartCheckoutIcon style={{fontSize:60, color:'white', textAlign:'center', marginLeft:'20%', marginTop:'20%'}}/>
                    </Grid>

                    <form encType="text/plain"
                          action="http://18.200.191.178:8081/api/v1/icash/me/redirect"

                          method="get" id="duma">
                        <input name="ip" value="169.255.204.4"/>
                        <input name="merchantKey" value="617d5a072873221c578ef947"/>
                        <input name="currency" value="USD"/>
                        <input name="amount" value="1000"/>
                        <input name="callBackUrl" value="https://collect.icash-congo.com/"/>
                        <input type="submit" value="Pay with duma"/>
                    </form>


                </Paper>
            </Container>
        </Zoom>
    )
}

export default MerchantApplication
