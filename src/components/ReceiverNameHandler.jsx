import React from "react"
import {ListItem, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {nameFormating} from "../utils/helperFunctions";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({

    listItem: {
        color:'black',
        fontSize:50,
    },
    listItemText:{
        fontSize:25,
    },
}));



const ReceiverNameHandler=({formValues})=>{
    const classes = useStyles()
    const {t} = useTranslation()
    return(
        <>
            {
                formValues.clientName ?
                    (
                        <ListItem className={classes.listItem} >
                            <ListItemText primary={t('Organization')} style={{fontWeight:'700', color:'grey'}}/>
                            <Typography variant="body1" style={{fontWeight:'600', fontSize:16}}>{formValues.clientName ? nameFormating(formValues.clientName):'*****'}</Typography>
                        </ListItem>
                    )
                    :
                    (
                        <ListItem className={classes.listItem} >
                            <ListItemText primary={t('Receiver')} style={{fontWeight:'700', color:'grey'}}  />
                            <Typography variant="body1" style={{fontWeight:'600', fontSize:16}}>{formValues.clientName ? nameFormating(formValues.receiverName):'*****'}</Typography>
                        </ListItem>
                    )
            }
        </>
    )
}

export default ReceiverNameHandler
