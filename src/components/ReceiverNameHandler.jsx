import React from "react"
import {ListItem, ListItemText, makeStyles, Typography} from "@material-ui/core";
import {nameFormating} from "../utils/helperFunctions";
import {useTranslation} from "react-i18next";
import {NO_CONTENT} from "../constants/variableNames";

const useStyles = makeStyles(() => ({

    listItem: {
        color:'black',
        fontSize:50,
    },
    listItemText:{
        fontSize:25,
        fontWeight:'700',
        color:'grey'
    },
    typography:{
        fontWeight:'600',
        fontSize:16
    }
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
                            <ListItemText primary={t('Organization')} className={classes.listItemText}/>
                            <Typography variant="body1" className={classes.typography}>
                                { formValues.clientName ? nameFormating(formValues.clientName) : NO_CONTENT }
                            </Typography>
                        </ListItem>
                    )
                    :
                    (
                        <ListItem className={classes.listItem} >
                            <ListItemText primary={t('Receiver')} className={classes.listItemText} />
                            <Typography variant="body1" className={classes.typography}>
                                { formValues.receiverName ? nameFormating(formValues.receiverName) : NO_CONTENT }
                            </Typography>
                        </ListItem>
                    )
            }
        </>
    )
}

export default ReceiverNameHandler
