import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {totalToPay} from "../../utils/helperFunctions";
import {makeStyles} from "@material-ui/core/styles";
import {useTranslation} from "react-i18next";



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
    }
}));


const GatewayInfo =({currency, businessObject })=>{
    const classes = useStyles();
    const {t} = useTranslation()
    return(
        <Grid className={classes.sectionOne}>

            <Grid item xs={12} sm={12} md={12} className={classes.paddingManager} >
                <Grid item  xs={12}>
                    <Typography variant="h6">{t("Payment Details")}</Typography>
                </Grid>
                <List>
                    <ListItem className={classes.listItem} >
                        <ListItemText primary={t('Currency :')} className={classes.key}   />
                        <Typography variant="body1" className={classes.value}>{currency}</Typography>
                    </ListItem>
                    <ListItem className={[classes.listItem, classes.totalBg]}  >
                        <ListItemText primary={t('Total :')} className={classes.key}   />
                        <Typography variant="body1" className={classes.value}>{totalToPay(businessObject)}</Typography>
                    </ListItem>
                </List>
            </Grid>

        </Grid>
    )
}

export default GatewayInfo
