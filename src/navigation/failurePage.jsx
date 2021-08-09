import React, {useEffect, useState} from 'react'
import { Container, Paper, Grid, 
  // Button 
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
// import {  useHistory} from "react-router-dom";
import { makeStyles, } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';
// import { useStateValue } from "../StateContext/";


const useStyles = makeStyles(() => ({
    boxWrapper: {
        width:450, 
        height:640, 
        marginBottom:10, 
        // paddingLeft:10,
        // paddingRight:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        // borderWidth:10,
      
        
        
        
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
      // justifyContent:'center', 
      // alignItems:'center' , 
      // alignText:'center'
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
 
  // const history = useHistory()
  // const onClick = () =>{
  //   dispatch({ type: 'emptyFormValue'})
  //   history.push('/')
  // }
  
  return(
     <Zoom in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
        <Container className={classes.boxWrapper}>
          <Paper className={classes.paper}>
            

            <Grid container  justify='center' className={classes.boxTitle}>

          <p style={{fontWeight:'bold', fontSize:25, color:'white'}} >Failure</p>
            </Grid>

            <div style={{height:40}} />
              

            <Grid  item className={classes.boxIcon}>
              <ClearIcon style={{fontSize:60, color:'white', textAlign:'center', marginLeft:'20%', marginTop:'20%'}}/>

            </Grid>
            
            <p style={{textAlign:'center', fontSize:25}}>Your payment to: <br /> <span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span> <br /> did not successfully pass, for the following reason... :(</p>
            {/* <p style={{textAlign:'center', fontSize:18}}></p> */}
            <Grid container item justify='center' style={{marginTop:30}}>
              {/* <Button
                variant="contained"
                style={{ backgroundColor:'#F1F8FF', color:'black', width:'40%',height:50}}
                type="button"
                onClick={onClick}
            >            
                
                 <a href={`http://localhost:3000`} style={{textDecoration:'none', color:'black'}}>Retry</a>
            
            </Button> */}

            
        </Grid>
        
          </Paper>

        </Container>
    </Zoom>
  )
}

export default FailurePage