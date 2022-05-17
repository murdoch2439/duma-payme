import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    // Link,
    Typography,
} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useStateValue} from "../../context";
import {CHANGE_MODAL_STATES, SHOW_CANCELLED_MODAL} from "../../constants/variableNames";

const ConfirmationDialog = () => {
    const {t} = useTranslation()
    const [{ formValues }, dispatch] = useStateValue();
    const handleCancel =()=>{
        if(formValues.callBackUrl){
            dispatch({
                type:CHANGE_MODAL_STATES,
                key:SHOW_CANCELLED_MODAL,
                value:true
            })
        }
    }

    const [open, toggleOpen] = useState(false);

    const clickHandler = (event) => {
        event.preventDefault();

        toggleOpen(true);
    };


    return <Typography variant="caption">

                        <Button
                            style={{borderRadius:100, backgroundColor:'#e3e3e3', fontSize: 14, textTransform:"capitalize", paddingLeft:20, paddingRight:20}}
                             disabled={formValues.paymentProcessStarted}
                            onClick={clickHandler}
                        >
                            {t("Cancel")}
                        </Button>

        <Dialog
            open={open}
            onClose={() => toggleOpen(false)}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"


        >
            <DialogTitle style={{textAlign:'center', color:"grey"}} id="dialog-title" color="primary">
                {t("Information")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description" style={{textAlign:'center', color:"black"}}>
                    You're about to cancel this payment<br />
                    Do you really wanna stop this operation?<br />
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{display:'flex', justifyContent:'center'}}>
                <Button
                    style={{backgroundColor:'red', color:"white"}}

                    onClick={handleCancel}
                    color="primary"
                    autoFocus>
                    {t("Yes")}
                </Button>
                <Button
                    style={{backgroundColor:'#FBB900', color:"white"}}
                    onClick={() => toggleOpen(false)}
                    color="primary"
                    autoFocus>
                    {t("No")}
                </Button>
            </DialogActions>
        </Dialog>
    </Typography>
}

export default ConfirmationDialog;
