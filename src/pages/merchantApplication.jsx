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
    }
    const baseUrl = "http://3.248.233.61:8081/api/v1/icash/me/redirect"
    // const baseUrl = "http://192.168.100.3:8081/api/v1/icash/me/redirect"

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
                    <form
                        encType="text/plain"
                        action={baseUrl}
                        method="get" id="duma"
                    >
                        <input name="ip" value="41.174.139.155"/>
                        <input name="merchantKey" value="624476442a83f01bd9c8b528"/>
                        <input name="currency" value="ZAR"/>
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
