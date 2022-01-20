import React, {useEffect, useState} from 'react'
import {
    Container, Paper, Grid, Button, List, ListItem, ListItemText, Typography
} from "@material-ui/core";
import UpdateIcon from '@material-ui/icons/Update';
// import {  useHistory
// } from "react-router-dom";
import { makeStyles, } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import { useStateValue } from '../context';
import {CHANGE_MODAL_STATES, SHOW_PENDING_MODAL, SHOW_SUCCESS_MODAL} from "../constants/variableNames";
import {useTranslation} from "react-i18next";
import {nameFormating, totalToPay} from "../utils/helperFunctions";
import OperationsSummeryComponent from "../components/operationsSummeryComponent";

const useStyles = makeStyles(() => ({
    boxWrapper: {
        // width:450,
        // height:560,
        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    paper: {
        height:530,
        backgroundColor:'white',
        marginTop:80,
        alignItems:'center',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxTitle:{
        backgroundColor:'#FBB900',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    title:{
        fontWeight:'bold',
        fontSize:25,
        color:'white'
    },
    boxIcon:{
        height:100,
        width:100,
        backgroundColor:'#FBB900',
        margin:'auto',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
    } ,
    total: {
        fontWeight: '500',
        color:'white',
        fontSize:18
    },
}));


const PendingPage =()=>{
    const [ dispatch] = useStateValue();
    // const history = useHistory()
    const [loading, setLoading] = useState(false)
    const {t}=useTranslation()
    const classes = useStyles()
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        handleChange()
    },[])

    const handleChange = () => {
        setChecked(true);
    };
    const onClick = () =>{
        setLoading(true)
        setTimeout(()=>{
            dispatch({
                type: CHANGE_MODAL_STATES,
                key: SHOW_SUCCESS_MODAL,
                value: true
            })
            dispatch({
                type: CHANGE_MODAL_STATES,
                key: SHOW_PENDING_MODAL,
                value: false
            })
            setLoading(false)
        },3000)
    }

    return(
        <Zoom maxWidth="xs" in={checked} style={{ transitionDelay: checked ? '300ms' : '0ms' }}>
            <Container className={classes.boxWrapper}>
                <Paper className={classes.paper}>
                    <Grid container  justifyContent='center' className={classes.boxTitle}>
                        <p className={classes.title} >{t("Information")}</p>
                    </Grid>
                    <div style={{height:40}} />
                    <Grid  item className={classes.boxIcon}>
                        <UpdateIcon style={{fontSize:60, color:'white'}}/>
                    </Grid>
                    {/*<p style={{textAlign:'center', fontSize:25}}>*/}
                    {/*    {t("Your payment to:")} <br />*/}
                    {/*    <span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span>*/}
                    {/*    <br />*/}
                    {/*    {t("is being processed, confirm the operation with your mobile phone, then click the button bellow to refresh the status :)")}*/}
                    {/*</p>*/}
                    <p style={{textAlign:'center', fontSize:22}}>
                        {t("Payment waiting for validation")} <br />
                        {/*<span style={{fontWeight:'bold'}}>{formValues.receiverName}, </span>*/}
                        {/*<br />*/}
                        {/*{t("Passed successfully, thank you for reaching out! You can order another payment link for another payment")}*/}
                    </p>
                    <OperationsSummeryComponent />
                    <Grid container item justify='center' style={{marginTop:0, paddingBottom:50}}>
                        <Button
                            onClick={onClick}
                            style={{
                                backgroundColor: loading ? '#f5f5f5': '#FBB900',
                                color:loading ? '#FBB900':'white',
                                height:50,
                                width:220,
                            }}
                            disabled={loading}
                        >
                            {loading? t('Refreshing Status...'): t('Refresh')}
                        </Button>
                    </Grid>
                </Paper>
            </Container>
        </Zoom>
    )
}
export default PendingPage
