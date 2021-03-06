import React from "react"
import {Grid,Typography, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import {totalToPay} from "../../utils/helperFunctions";
import {useTranslation} from "react-i18next";
import ConfirmationDialog from "../modals/confirmationModal";



const useStyles = makeStyles(() => ({
    listItem: {
        color:'black'
    },
    total: {
        fontWeight: 'bold',
        color:'black'
    },
    title: {
    },
    sectionOne:{
        width:'100%', display:'flex'
    },
    paddingManager:{
        padding:'0 5px 0 5px'
    },
    key:{
        fontWeight:'800',
        color:'black'
    },
    value:{
        fontWeight:'500'
    },
    totalBg:{
        backgroundColor:'#F1F5F6',  borderRadius:5,
    },
    separator:{
        height:1,
        marginTop:10,
        width:'96%',
        marginRight:10,
        marginLeft:10,
        backgroundColor:'#C4C4C4'
    },
    secondSection:{
        marginRight:10,marginLeft:10,
    },
    header:{
        display:"flex",
        justifyContent:"space-between",
    }
}));


const GatewayInfo =({currency, businessObject })=>{
    const classes = useStyles();
    const {t} = useTranslation()
    return(
        <Grid className={classes.sectionOne}>

            <Grid item xs={12} sm={12} md={12} className={classes.paddingManager} >
                <Grid item xs={12} sm={12} md={12} className={classes.header} display={{ xs: 'inline',sm:'inline', md:'flex'}}>
                    <Grid item  xs={12}>
                        <Typography variant="h6">{t("Payment Details")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} style={{ display:'flex', justifyContent:"flex-end"}}>
                        <ConfirmationDialog />
                    </Grid>
                </Grid>

                <List>
                    <ListItem className={classes.listItem} >
                        <ListItemText primary={t('Currency :')} className={classes.key}   />
                        <Typography variant="body1" className={classes.value}>{currency}</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem} style={{backgroundColor:'#F1F5F6',  borderRadius:5,}}  >
                        <ListItemText primary={t('Total :')} className={classes.key}   />
                        <Typography variant="body1" className={classes.value}>{totalToPay(businessObject)}</Typography>
                    </ListItem>
                </List>
            </Grid>

        </Grid>
    )
}

export default GatewayInfo
