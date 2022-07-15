import React from "react"
import {Button} from "@material-ui/core";
import {CHANGE_MODAL_STATES, SHOW_CANCELLED_MODAL} from "../constants/variableNames";
import {useStateValue} from "../context";
import {useTranslation} from "react-i18next";


const CancelButton =()=>{
    const [{ formValues }, dispatch] = useStateValue();
    const {t} = useTranslation()
    const handleCancel =()=>{
        if(formValues.callBackUrl){
            dispatch({
                type:CHANGE_MODAL_STATES,
                key:SHOW_CANCELLED_MODAL,
                value:true
            })
        }
    }

    return(
        <>
            <Button
                style={{
                    borderRadius:100,
                    backgroundColor:'#e0e0e0',
                    fontSize: 14,
                    textTransform:"capitalize",
                    paddingLeft:20,
                    paddingRight:20}}
                onClick={handleCancel}
            >
                {t("Cancel")}
            </Button>
         </>
    )
}

export default CancelButton
