import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid, Button
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import axios from 'axios'

import { makeStyles, } from '@material-ui/core/styles';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';
import {API_DUMA_PAY_CLIENT_INIT} from "../constants/variableNames";
// import {CHANGE_MODAL_STATES, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL} from "../constants/variableNames";



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
      let clientIp=''


const PayWithDumaPay =()=>{
          const [loading, setLoading] = useState(false)
    const [{ formValues }] = useStateValue();
    const cbUrl = "192.168.1.101:8080/index"
    const adminId = "61b086378fd8086af11fdd33"
    const currency = "USD"
    const amount = "600"
    const backgroundChanger = () =>{
        if(!loading){
            return '#FBB900'
        }else{
            return '#f5f5f5'
        }
    }


    const onClick =async() =>{
        // dispatch({
        //     type: 'emptyFormValue',
        //
        // })
        try{
            setLoading(true)
            // const ip = await axios.get('https://geolocation-db.com/json', )
            //     .then(response =>{
            //          clientIp = response.data.IPv4
            //         console.log('Ip adress ====>:', clientIp)
            //     })
             await axios.post('http://192.168.1.101:8081/api/v1/icash/me/redirect', {ip: '197.157.209.2', adminId, cbUrl, currency, amount}, ).then((response)=>{
                 console.log('ip ==> 197.157.209.2')
                setLoading(false)
                console.log('product ==>', response.data)
                 setLoading(false)
            })

        }catch(error){
            setLoading(false)
            console.log('Error when Trying to ===>', error)

        }

        // window.location.reload()
        // dispatch({
        //     type: CHANGE_MODAL_STATES,
        //     key: SHOW_SUCCESS_MODAL,
        //     value: false
        // })
        // dispatch({
        //     type: CHANGE_MODAL_STATES,
        //     key: SHOW_PENDING_MODAL,
        //     value: false
        // })

        // history.replace('/')

    }

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
                          action="http://192.168.1.101:8081/api/v1/icash/me/redirect"

                          method="get" id="duma">
                        <input name="ip" value="197.157.209.2"/>
                        <input name="adminId" value="61b086378fd8086af11fdd33"/>
                        <input name="currency" value="USD"/>
                        <input name="amount" value="600"/>
                        <input name="cbUrl" value="http://192.168.1.101:8080/index"/>
                        <input type="submit" value="Pay with duma"/>
                    </form>

                    <p style={{textAlign:'center', fontSize:25}}>
                        Currency:
                        <span style={{fontWeight:'bold'}}> {currency}</span>
                        <br/>
                        Total:
                        <span style={{fontWeight:'bold'}}> {amount}$</span>
                        <br />
                        Click on the button billow to purchase your project
                    </p>
                    <Grid container item justify='center' style={{marginTop:30}}>
                        <Button
                            onClick={onClick}
                            disabled={loading}
                            style={{backgroundColor:  backgroundChanger(), color:loading ? '#FBB900':'white', height:50, width:220, }}
                        >
                            PAY WITH DUMA
                        </Button>
                    </Grid>
                </Paper>
            </Container>
        </Zoom>
    )
}

export default PayWithDumaPay
