import React from 'react'

import {  List, makeStyles, ListItem, ListItemText, Typography
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useStateValue} from "../context";
import {nameFormating, totalToPay} from "../utils/helperFunctions";
const useStyles = makeStyles(() => ({
    boxWrapper: {
        // width:800,
        marginBottom:10,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    paper: {
        // height:500,
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
        fontSize:50
    },
    listItemText:{
        fontSize:25,
    },
    total: {
        fontWeight: '500',
        color:'white',
        fontSize:18
    },
}));

const OperationsSummeryComponent = () =>{
    const [{ formValues }] = useStateValue();
    const {t} = useTranslation()
    const classes = useStyles()
    return(
        <div>
            <List   disablePadding >
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Amount :')} style={{fontWeight:'700', color:'grey', }}   />
                    <div style={{backgroundColor:'green', padding:5, borderRadius:5}}>
                        <Typography  variant="body1" className={classes.total}>{totalToPay({
                            currency:formValues
                                .currency,
                            amount:formValues
                                .amount
                        })}</Typography>
                    </div>

                </ListItem>
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Sender :')} style={{fontWeight:'700', color:'grey'}}  />
                    <Typography variant="body1" style={{fontWeight:'500', fontSize:18}}>{formValues.name ? nameFormating(formValues.name):'*****'}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Receiver :')} style={{fontWeight:'700', color:'grey'}}  />
                    <Typography variant="body1" style={{fontWeight:'500', fontSize:18}}>{formValues.receiverName ? nameFormating(formValues.receiverName):'*****'}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Organization :')} style={{fontWeight:'700', color:'grey'}} />
                    <Typography variant="body1" style={{fontWeight:'500', fontSize:18}}>{formValues.clientName ? nameFormating(formValues.clientName):'*****'}</Typography>
                </ListItem>
                <ListItem className={classes.listItem} >
                    <ListItemText primary={t('Reference code :')} style={{fontWeight:'700', color:'grey'}} />
                    <Typography variant="body1" style={{fontWeight:'500', fontSize:18}}>{formValues.transactionReference ? formValues.transactionReference:'*****'}</Typography>
                </ListItem>

                {/*<ListItem className={classes.listItem} >*/}
                {/*    <ListItemText primary={t('Fees :')} style={{fontWeight:'700', color:'grey'}} />*/}
                {/*    <Typography variant="body1">{`${businessLogicManager(formValues.currency, fees )}`}</Typography>*/}
                {/*</ListItem>*/}
                {/*{*/}
                {/*    formValues.currency === 'eur'?*/}
                {/*        <ListItem className={classes.listItem} >*/}
                {/*            <ListItemText primary={t('Rate :')} style={{fontWeight:'700', color:'grey'}} />*/}
                {/*            <Typography variant="body1">*/}
                {/*                {businessLogicManager(formValues.currency, formValues.rate )}*/}
                {/*            </Typography>*/}
                {/*        </ListItem>:null*/}
                {/*}*/}


                {/*<ListItem className={classes.listItem} style={{backgroundColor:'#F1F5F6',  borderRadius:5,}}>*/}
                {/*    <ListItemText  primary={t("Total :")} className={classes.total}/>*/}
                {/*    <Typography variant="subtitle1" className={classes.total}>*/}
                {/*        {` ${businessLogicManager(formValues.currency, total )} ${formValues.currency}`}*/}
                {/*    </Typography>*/}
                {/*</ListItem>*/}
            </List>

        </div>
    )
}

export default OperationsSummeryComponent
