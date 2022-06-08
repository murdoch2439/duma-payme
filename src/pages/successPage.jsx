import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid, makeStyles,
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import Zoom from '@material-ui/core/Zoom';
import {useTranslation} from "react-i18next";
import OperationsSummeryComponent from "../components/operationsSummeryComponent";
import {getUrlParams} from "../utils/helperFunctions";
import {OPTION_STRING} from "../constants/variableNames";
import {useStateValue} from "../context";

const useStyles = makeStyles(() => ({
    boxWrapper: {
        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    paper: {
        backgroundColor:'white',
        marginTop:80,
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxTitle:{
      backgroundColor:'rgba(17, 182, 102, 0.14)',
      borderTopLeftRadius:10,
      borderTopRightRadius:10
    },
    boxIcon:{
      height:80,
      width:80,
      backgroundColor:'rgba(17, 182, 102, 0.20)',
      margin:'auto',
      borderRadius:100,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },
    listItem: {
        color:'black',
        fontSize:50
    },
    listItemText:{
        fontSize:25,
    },
    total: {
        fontWeight: '500',
        color:'white',
        fontSize:18
    },
}));


const SuccessPage =()=>{
    const [{ formValues }] = useStateValue();

  const {t} = useTranslation()
    const option= getUrlParams()[OPTION_STRING]

  const classes = useStyles()
  const [checked, setChecked] = useState(false);
    const [countDown, setCountDown] = useState(5)
  useEffect(()=>{
    handleChange()
      const myInterval =  setInterval(()=>{setCountDown(prevValue => prevValue -1)}, 1000)
      if(countDown === 0){
          clearInterval(myInterval)
          if(formValues.callBackUrl){
              window.location.href = `${formValues.callBackUrl}?status=success`
          }
      }
      return ()=> clearInterval(myInterval)
  },[countDown])

  const handleChange = () => {
    setChecked(true);
  };

  return(
         <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container  className={classes.boxWrapper}>
              <Paper className={classes.paper}>
                <Grid container  justifyContent='center' className={classes.boxTitle}>
                    <p style={{fontWeight:'bold', fontSize:20, color:'green'}} >{t("Confirmation")}</p>
                </Grid>
                <div style={{height:10}} />
                <Grid  item className={classes.boxIcon}>
                  <CheckIcon style={{fontSize:60, color:'green'}}/>
                </Grid>
                  {
                      option ?
                          <div>
                              <p style={{textAlign:'center', fontSize:18, paddingLeft:10, paddingRight:10}}>

                                  {t(`Payment passed successfully, you are being redirected in `) }
                                  <br />
                              </p>
                              <p style={{fontWeight:'bold', fontSize:30, textAlign:'center'}}>0{countDown} secs</p>
                          </div>
                           :
                          <p style={{textAlign:'center', fontSize:18}}>

                              {t("Payment passed successfully:")} <br />
                          </p>
                  }
                <OperationsSummeryComponent />
              </Paper>
            </Container>
        </Zoom>
  )
}

export default SuccessPage
