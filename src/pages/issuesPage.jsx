import React from 'react'
import { Container, Paper, Grid,
} from "@material-ui/core";
// import CloudOffIcon from '@mui/icons-material/CloudOff';
// import PowerOffIcon from '@mui/icons-material/PowerOff';
// import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';

import { makeStyles, } from '@material-ui/core/styles';
// import {useHistory} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import picture from '../assets/Laptop.svg'


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
        borderTopRightRadius:10
    },
    boxIcon:{
        height:150,
        width:150,
        backgroundColor:'#84846c',
        margin:'auto',
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
}));

const IssuesPage =()=>{
    // const history = useHistory()
    const {t} = useTranslation()

    const classes = useStyles()
    // const onClick =() =>{
    //     history.goBack()
    // }

    return(

        <Container  className={classes.boxWrapper}>
            <Paper className={classes.paper}>
                <Grid container  justifyContent='center' className={classes.boxTitle}>
                    <p style={{fontWeight:'bold', fontSize:25, color:'black'}} >{t("Not found")}</p>
                </Grid>
                <div style={{height:40}} />
                <p style={{textAlign:'center', fontSize:25}}>
                    {t("Oups!!, something just went wrong!")} <br />
                </p>
                <p style={{textAlign:'center',}}>
                    <img src={picture} alt="f0f" style={{width:350}} />
                </p>
                <p style={{textAlign:'center', fontSize:25}}>
                    {t("Make sure the link is correct")}
                </p>
                <Grid container item justify='center' style={{marginTop:30}}>
                    {/*<Button*/}
                    {/*    onClick={onClick}*/}
                    {/*    style={{backgroundColor:  'white', color:'#FBB900', height:50, width:220, }}*/}
                    {/*>*/}
                    {/*    {t("Go back")}*/}
                    {/*</Button>*/}
                </Grid>

            </Paper>
        </Container>
    )
}

export default IssuesPage
