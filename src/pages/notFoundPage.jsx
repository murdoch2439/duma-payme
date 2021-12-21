import React from 'react'
import { Container, Paper, Grid,
} from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import PowerOffIcon from '@mui/icons-material/PowerOff';

import { makeStyles, } from '@material-ui/core/styles';


// import {CHANGE_MODAL_STATES, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL} from "../constants/variableNames";


const useStyles = makeStyles(() => ({
    boxWrapper: {

        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,

    },
    paper: {
        height:500,
        backgroundColor:'white',
        marginTop:80,
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxTitle:{
        backgroundColor:'white',
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



const NotFoundPage =()=>{

    const classes = useStyles()


    return(
        // <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container  className={classes.boxWrapper}>
                <Paper className={classes.paper}>

                    <Grid container  justifyContent='center' className={classes.boxTitle}>
                        <p style={{fontWeight:'bold', fontSize:25, color:'black'}} >Not found</p>
                    </Grid>
                    <div style={{height:40}} />
                    <Grid  item className={classes.boxIcon}>
                        <CloudOffIcon style={{fontSize:60, color:'black', textAlign:'center', marginLeft:'20%', marginTop:'20%'}}/>
                    </Grid>
                    <p style={{textAlign:'center', fontSize:25}}>
                        Oups!!, something just went wrong! <br />
                        <span style={{fontWeight:'bold', fontSize:100,}}>404</span>
                        <br />
                        Sorry, page not found!
                    </p>

                </Paper>
            </Container>
        // </Zoom>
    )
}

export default NotFoundPage
