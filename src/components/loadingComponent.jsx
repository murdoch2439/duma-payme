import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";
import { Container, Box, Grid } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    // '& > * + *': {

      margin:'15% 0 0 0',
      // backgroundColor:'red',
      // height:'100%',
      textAlign:'center',
      justifyContent:'center',
      alignItems:'center',

      
    // },
  },
}));

const LoadingComponent = () =>{
  const classes = useStyles();
  return(
    <Container className={classes.root} justifyContent='center'>

      <Box  >

        <Loader
          type="Puff"
          color="white"
          height={100}
          width={100}
          timeout={5000} 
        />

      </Box>
    </Container>
  )
}


export default LoadingComponent





