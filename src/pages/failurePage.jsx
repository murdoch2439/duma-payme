import React, { useEffect, useState } from 'react'
import {Container, Paper, Grid, Button} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';
import {CHANGE_MODAL_STATES, SHOW_FAIL_MODAL} from "../constants/variableNames";
import {useTranslation} from "react-i18next";

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
      backgroundColor:'#d10c02',
      borderTopLeftRadius:10,
      borderTopRightRadius:10
    },
    boxIcon:{
      height:100,
      width:100,
      backgroundColor:'#d10c02',
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

const FailurePage =()=>{
  const [{ formValues }, dispatch] = useStateValue();
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
              window.location.href = `${formValues.callBackUrl}?failed=true`
          }
      }
      return ()=> clearInterval(myInterval)
      // if(formValues.callBackUrl){
      //     setTimeout(()=>{
      //         window.location.href = `${formValues.callBackUrl}?failed=true`
      //     }, 5000)
      // }
  },[countDown])




  const handleChange = () => {
    setChecked(true);
  };

    const onClick =() =>{
        if(formValues.callBackUrl){

                window.location.href = `${formValues.callBackUrl}?failed=true`
        }else{
            // dispatch({
            //     type: CHANGE_MODAL_STATES,
            //     key: SHOW_FAIL_MODAL,
            //     value: false,
            // })
        }

    }

  return(
     <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
        <Container className={classes.boxWrapper}>
          <Paper className={classes.paper}>
            <Grid container  justifyContent='center' className={classes.boxTitle}>
                <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >{t("Information")}</p>
            </Grid>
                <div style={{height:40}} />
                <Grid  item className={classes.boxIcon}>
                  <ClearIcon style={{fontSize:60, color:'white'}}/>
                </Grid>
                <p style={{textAlign:'center', fontSize:25}}>
                    {t("Your payment to:")} <br />
                    <span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span>
                    <br />
                    {
                        formValues.callBackUrl ?
                            t(`has failed, You will be redirected in ${countDown} secs.`):
                            t("has failed, please check informations and retry.")
                    }

                </p>
            <Grid container item justifyContent='center' style={{marginTop:30}}>
                <Button
                    onClick={onClick}
                    className={classes.button}
                >
                    {
                        formValues.callBackUrl ?
                            t("Go back shopping"):
                            t("Retry")
                    }
                </Button>
            </Grid>
          </Paper>
        </Container>
     </Zoom>
  )
}
export default FailurePage
