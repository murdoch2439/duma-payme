import React from 'react'
import {  List, makeStyles, ListItem, ListItemText, Typography
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useStateValue} from "../context";
import {nameFormating, receivingAmount, totalToPay} from "../utils/helperFunctions";
import ReceiverNameHandler from "./ReceiverNameHandler";
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
        backgroundColor:'green',
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    },
    boxIcon:{
        height:100,
        width:100,
        backgroundColor:'green',
        margin:'auto',
        borderRadius:100,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    listItem: {
        color:'black',
        fontSize:50,
    },
    listItemText:{
        fontSize:25,
    },
    total: {
        fontWeight: '500',
        color:'gray',
        fontSize:16,

    },
}));

const OperationsSummeryComponent = () =>{
    const [{ formValues }] = useStateValue();
    const {t} = useTranslation()
    const businessObject = {currency:formValues.currency, clientCurrency:formValues.clientCurrency, amount: formValues.amount, rate:formValues.rate}
    const classes = useStyles()

    return(
        <div>
            <List   disablePadding >
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Sender')} style={{fontWeight:'700', color:'grey'}}  />
                    <Typography variant="body1" style={{fontWeight:'600', fontSize:16}}>{formValues.name ? nameFormating(formValues.name):'*****'}</Typography>
                </ListItem>
                <ReceiverNameHandler formValues={formValues} />
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Reference code')} style={{fontWeight:'700', color:'grey'}} />
                    <Typography variant="body1" style={{fontWeight:'400', fontSize:16}}>{formValues.transactionReference ? formValues.transactionReference:'*****'}</Typography>
                </ListItem>
                <div style={{height:1, backgroundColor:'#E7E7E7', margin: "0 15px"}} />

                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Paid amount')} style={{fontWeight:'700', color:'grey', }}   />

                        <Typography  variant="body1" className={classes.total}>{totalToPay({
                            currency:formValues
                                .currency,
                            amount:formValues
                                .amount
                        })}</Typography>

                </ListItem>
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Receiving')} style={{fontWeight:'700', color:'grey'}} />
                    <div style={{backgroundColor:'rgba(17, 182, 102, 0.06)', borderRadius:100, color:'#11B666', fontWeight:"bold"}}>

                    <Typography variant="body1" style={{fontWeight:'bold', padding:"7px 10px"}}>{formValues.clientCurrency} {receivingAmount(businessObject)}</Typography>
                    </div>
                </ListItem>
            </List>
        </div>
    )
}

export default OperationsSummeryComponent
