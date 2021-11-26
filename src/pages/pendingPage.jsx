import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid, Button
} from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';
// import {  useHistory
// } from "react-router-dom";

import { makeStyles, } from '@material-ui/core/styles';

import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';
import {CHANGE_MODAL_STATES, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL} from "../constants/variableNames";




const useStyles = makeStyles(() => ({
    boxWrapper: {
        // backgroundColor:'red',
        width:450,
        height:560,
        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,

    },
    paper: {
        height:530,
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



const PendingPage =({paymentID,})=>{
    const [{ formValues }, dispatch] = useStateValue();
    // const history = useHistory()
    const [loading, setLoading] = useState(false)

    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        handleChange()
    },[])

    const handleChange = () => {
        setChecked(true);
    };
    const onClick = () =>{
        setLoading(true)
        setTimeout(()=>{

            dispatch({
                type: CHANGE_MODAL_STATES,
                key: SHOW_SUCCESS_MODAL,
                value: true
            })
            dispatch({
                type: CHANGE_MODAL_STATES,
                key: SHOW_PENDING_MODAL,
                value: false
            })
            setLoading(false)
        },3000)

    }

    return(
        <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container className={classes.boxWrapper}>
                <Paper className={classes.paper}>
                    <Grid container  justifyContent='center' className={classes.boxTitle}>
                        <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >Information</p>
                    </Grid>
                    <div style={{height:40}} />
                    <Grid  item className={classes.boxIcon}>
                        <UpdateIcon style={{fontSize:60, color:'white', textAlign:'center', marginLeft:'20%', marginTop:'20%'}}/>
                    </Grid>

                    <p style={{textAlign:'center', fontSize:25}}>
                        Your payment to: <br />
                        <span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span>
                        <br />
                        is being processed, confirm the operation with your mobile phone, then click the button bellow to refresh the status :)
                    </p>

                    <Grid container item justify='center' style={{marginTop:30, paddingBottom:50}}>
                        <Button
                            onClick={onClick}
                            style={{
                                backgroundColor: loading ? '#f5f5f5': '#FBB900',
                                color:loading ? '#FBB900':'white',
                                height:50,
                                width:220,
                            }}
                            disabled={loading}
                        >
                            {loading?'REFRESHING STATUS...': 'CLICK TO REFRESH'}
                        </Button>
                    </Grid>
                </Paper>
            </Container>
        </Zoom>
    )
}

export default PendingPage
