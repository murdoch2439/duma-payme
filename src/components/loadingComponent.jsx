import React from 'react'
import { makeStyles, Container } from '@material-ui/core';
import Loader from "react-loader-spinner";
// import { Container, } from "@material-ui/core";
import {CHANGE_MODAL_STATES, SHOW_ACCESS_DENIED_MODAL} from "../constants/variableNames";


const useStyles = makeStyles(() => ({
  root: {
      marginTop:'20%',
      height:'100%',
      textAlign:'center',
  },
}));

const LoadingComponent = ({currency}) =>{
  const classes = useStyles();
  const contentManager =()=>{
      if(!currency){
          // dispatch({
          //     type: CHANGE_MODAL_STATES,
          //     key: SHOW_ACCESS_DENIED_MODAL,
          //     value: true
          // })
      }
  }
  return(
    <Container className={classes.root}>

        <Loader
          type="Puff"
          color="white"
          height={100}
          width={100}
          // timeout={5000}
        />

    </Container>
  )
}


export default LoadingComponent





