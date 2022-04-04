import React from "react"
import { at} from "lodash"
import {useField } from "formik"
import {TextField} from "@material-ui/core";
import {useTranslation} from "react-i18next";

const InputField =(props)=>{
    const {errorText, ...rest} = props
    const [field, meta] = useField(props)
    const {t} = useTranslation()

    const _renderHelperText =()=>{
        const [touched, error] = at(meta, "touched", "error")
        if(touched && error){
            return t(error)
        }
    }
    return(
        <TextField
            variant="outlined"
            type={"text"}
            error={meta.touched && meta.error && true}
            helperText={_renderHelperText()}
            {...field}
            {...rest}
        />
    )
}

export default InputField
