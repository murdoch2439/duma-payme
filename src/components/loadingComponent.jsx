import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";
import { Container, } from "@material-ui/core";


const useStyles = makeStyles(() => ({
  root: {
      marginTop:'20%',
      height:'100%',
      textAlign:'center',
  },
}));

const LoadingComponent = () =>{
  const classes = useStyles();
  return(
    <Container className={classes.root}>

        <Loader
          type="Puff"
          color="white"
          height={100}
          width={100}
          timeout={5000}
        />


    </Container>
  )
}


export default LoadingComponent





