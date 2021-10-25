import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid,
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';



const useStyles = makeStyles(() => ({
    boxWrapper: {
        width:450,
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
    }
}));



const FailurePage =({paymentID})=>{
  const [{ formValues }, dispatch] = useStateValue();

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

          <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >Failure</p>
            </Grid>

            <div style={{height:40}} />


            <Grid  item className={classes.boxIcon}>
              <ClearIcon style={{fontSize:60, color:'white', textAlign:'center', marginLeft:'20%', marginTop:'20%'}}/>

            </Grid>

            <p style={{textAlign:'center', fontSize:25}}>Your payment to: <br /> <span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span> <br /> did not successfully pass, for the following reason... :(</p>

            <Grid container item justify='center' style={{marginTop:30}}>

        </Grid>

          </Paper>

        </Container>
    </Zoom>
  )
}

export default FailurePage
