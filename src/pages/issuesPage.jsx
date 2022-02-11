import React from 'react'
import { Container, Paper, Grid} from "@material-ui/core";
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
        borderTopRightRadius:10,
        justifyContent:'center',
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
    },
    paragraph:{
        fontWeight:"bold",
        fontSize:25,
        color:"black",
    },
    text:{
        textAlign:'center',
        fontSize:25
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
                <Grid container   className={classes.boxTitle}>
                    <p style={classes.paragraph} >{t("Not found")}</p>
                </Grid>
                <div style={{height:40}} />
                <p style={classes.text}>
                    {t("Oups!!, something just went wrong!")}<br />
                </p>
                <p style={{textAlign:'center',}}>
                    <img src={picture} alt="f0f" style={{width:250}} />
                </p>
                <p style={classes.text}>
                    {t("Make sure the link is correct")}
                </p>
                <Grid container item style={{marginTop:30, justifyContent:'center',}}>
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
