import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid, makeStyles,
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import Zoom from '@material-ui/core/Zoom';
import {useTranslation} from "react-i18next";

import OperationsSummeryComponent from "../components/operationsSummeryComponent";
// import {CHANGE_MODAL_STATES, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL} from "../constants/variableNames";

const useStyles = makeStyles(() => ({
    boxWrapper: {
        // width:800,
        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    paper: {
        // height:500,
        backgroundColor:'white',
        marginTop:80,
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxTitle:{
      backgroundColor:'green',
      borderTopLeftRadius:10,
      borderTopRightRadius:10
    },
    boxIcon:{
      height:100,
      width:100,
      backgroundColor:'green',
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

  const {t} = useTranslation()

  // const onClick =() =>{
  //     // dispatch({
  //     //     type: 'emptyFormValue',
  //     // })
  //     window.location.reload()
  //     // dispatch({
  //     //     type: CHANGE_MODAL_STATES,
  //     //     key: SHOW_SUCCESS_MODAL,
  //     //     value: false
  //     // })
  //     // dispatch({
  //     //     type: CHANGE_MODAL_STATES,
  //     //     key: SHOW_PENDING_MODAL,
  //     //     value: false
  //     // })
  //     // history.replace('/')
  // }

  const classes = useStyles()
  const [checked, setChecked] = useState(false);
  useEffect(()=>{
    handleChange()
  },[])

  const handleChange = () => {
    setChecked(true);
  };

  return(
         <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container  className={classes.boxWrapper}>
              <Paper className={classes.paper}>
                <Grid container  justifyContent='center' className={classes.boxTitle}>
                    <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >{t("Confirmation")}</p>
                </Grid>
                <div style={{height:10}} />
                <Grid  item className={classes.boxIcon}>
                  <CheckIcon style={{fontSize:60, color:'white'}}/>
                </Grid>
                  <p style={{textAlign:'center', fontSize:22}}>
                      {t("Payment passed successfully:")} <br />

                      {/*{t("Passed successfully, thank you for reaching out! You can order another payment link for another payment")}*/}
                  </p>
                <OperationsSummeryComponent />
                {/*<p style={{textAlign:'center', fontSize:25}}>*/}
                {/*    {t("Your payment to:")} <br />*/}
                {/*    <span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span>*/}
                {/*    <br />*/}
                {/*    {t("Passed successfully, thank you for reaching out! You can order another payment link for another payment")}*/}
                {/*</p>*/}
                {/*<Grid container item justify='center' style={{marginTop:30}}>*/}
                {/*    <Button*/}
                {/*        onClick={onClick}*/}
                {/*        style={{backgroundColor:  'green', color:'white', height:50, width:220, }}*/}
                {/*    >*/}
                {/*        FINISH*/}
                {/*    </Button>*/}
                {/*</Grid>*/}
              </Paper>
            </Container>
        </Zoom>
  )
}

export default SuccessPage
