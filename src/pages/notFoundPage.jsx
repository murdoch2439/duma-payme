import React from 'react'
import { Container, Paper, Grid, Button
} from "@material-ui/core";
// import CheckIcon from '@material-ui/icons/Check';
// import CloudOffIcon from '@mui/icons-material/CloudOff';
import picture from '../assets/ErrorSleeping.svg'
// import PowerOffIcon from '@mui/icons-material/PowerOff';
import { makeStyles, } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import {useTranslation} from "react-i18next";


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
        backgroundColor:'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        justifyContent:'center'
    },
    boxIcon:{
        height:100,
        width:100,
        backgroundColor:'#FBB900',
        margin:'auto',
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
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
            <Container  className={classes.boxWrapper}>
                <Paper className={classes.paper}>

                    <Grid container  className={classes.boxTitle}>
                        <p style={{fontWeight:'bold', fontSize:25, color:'black'}} >{t("Not found")}</p>
                    </Grid>

                    {/*<Grid  item className={classes.boxIcon}>*/}
                    {/*    <CloudOffIcon style={{fontSize:60, color:'black'}}/>*/}
                    {/*    /!*<img src={picture} alt="f0f" style={{width:100}} />*!/*/}
                    {/*</Grid>*/}
                    <p style={{textAlign:'center', fontSize:25}}>
                        {t("Oups!!, something just went wrong!")} <br />
                    </p>
                    <p style={{textAlign:'center',}}>
                        <img src={picture} alt="f0f" style={{width:250}} />
                    </p>
                    <p style={{textAlign:'center', fontSize:25}}>
                        {t("Sorry, page not found!")}
                    </p>
                    <Grid container item justifyContent='center' style={{marginTop:30}}>
                        <Button
                            onClick={onClick}
                            style={{backgroundColor:  'white', color:'#FBB900', height:50, width:220, }}
                        >
                            {t("Go back")}
                        </Button>
                    </Grid>

                </Paper>
            </Container>

    )
}

export default NotFoundPage
