import React from 'react'
import { Container, Paper, Grid, Button
} from "@material-ui/core";
// import CheckIcon from '@material-ui/icons/Check';
import CloudOffIcon from '@mui/icons-material/CloudOff';
// import PowerOffIcon from '@mui/icons-material/PowerOff';

import { makeStyles, } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {useTranslation} from "react-i18next";


// import {CHANGE_MODAL_STATES, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL} from "../constants/variableNames";


const useStyles = makeStyles(() => ({
    boxWrapper: {

        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,

    },
    paper: {
        height:550,
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
    const history = useHistory()
    const {t} = useTranslation()

    const classes = useStyles()
    const onClick =() =>{

        history.goBack()
    }


    return(
        // <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container  className={classes.boxWrapper}>
                <Paper className={classes.paper}>

                    <Grid container  justifyContent='center' className={classes.boxTitle}>
                        <p style={{fontWeight:'bold', fontSize:25, color:'black'}} >{t("Not found")}</p>
                    </Grid>
                    <div style={{height:40}} />
                    <Grid  item className={classes.boxIcon}>
                        <CloudOffIcon style={{fontSize:60, color:'black', textAlign:'center', marginLeft:'20%', marginTop:'20%'}}/>
                    </Grid>
                    <p style={{textAlign:'center', fontSize:25}}>
                        {t("Oups!!, something just went wrong!")} <br />
                        <span style={{fontWeight:'bold', fontSize:100,}}>404</span>
                        <br />
                        {t("Sorry, page not found!")}
                    </p>
                    <Grid container item justify='center' style={{marginTop:30}}>
                        <Button
                            onClick={onClick}
                            style={{backgroundColor:  'white', color:'#FBB900', height:50, width:220, }}
                        >
                            {t("Go back")}
                        </Button>
                    </Grid>

                </Paper>
            </Container>
        // </Zoom>
    )
}

export default NotFoundPage
