import React, { useEffect, useState } from 'react'
import {Container, Paper, Grid} from "@material-ui/core";
// import ClearIcon from '@material-ui/icons/Clear';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';
import {useTranslation} from "react-i18next";
import {CANCELLED, STATUS} from "../constants/variableNames";

const useStyles = makeStyles(() => ({
    boxWrapper: {
        height:640,
        marginBottom:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    paper: {
        height:500,
        backgroundColor:'white',
        marginTop:80,
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
    },
    boxTitle:{
        backgroundColor:'#e0e0e0',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxIcon:{
        height:100,
        width:100,
        backgroundColor:'#e0e0e0',
        margin:'auto',
        borderRadius:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:  'red',
        color:'white',
        height:50,
        width:220,
    }
}));

const CancelledPage =()=>{
    const [{ formValues }] = useStateValue();
    const {t} = useTranslation()
    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    const [countDown, setCountDown] = useState(5)
    useEffect(()=>{
        handleChange()
        const myInterval =  setInterval(()=>{setCountDown(countDown -1)}, 1000)
        if(countDown === 0){
            clearInterval(myInterval)
            if(formValues.callBackUrl){
                window.location.href = `${formValues.callBackUrl}?${STATUS}=${CANCELLED}`
            }
        }
        return ()=> clearInterval(myInterval)
    },[countDown])


    const handleChange = () => {
        setChecked(true);
    };

    return(
        <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container className={classes.boxWrapper}>
                <Paper className={classes.paper}>
                    <Grid container  justifyContent='center' className={classes.boxTitle}>
                        <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >{t("Information")}</p>
                    </Grid>
                    <div style={{height:40}} />
                    <Grid  item className={classes.boxIcon}>
                        <CloudOffIcon style={{fontSize:60, color:'white'}}/>
                    </Grid>
                    <p style={{textAlign:'center', fontSize:25}}>
                        {t("Your payment to:")} <br />
                        <span style={{fontWeight:'bold'}}>{formValues.clientName}, </span>
                        <br />
                        {
                            formValues.callBackUrl ?
                                <div>
                                    {t(`Was cancelled, You are being redirected in`)}
                                    <p style={{fontWeight:'bold', fontSize:30}}>{countDown} secs</p>
                                </div>
                                :
                                t("has failed, please check informations and retry.")
                        }

                    </p>
                    <Grid container item justifyContent='center' style={{marginTop:30}}>

                    </Grid>
                </Paper>
            </Container>
        </Zoom>
    )
}
export default CancelledPage
