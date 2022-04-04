import React from "react"
import PropTypes from "prop-types"
import {at} from "lodash"
import {useField} from "formik"
import { InputLabel, FormControl, Select, MenuItem, FormHelperText} from "@material-ui/core"
import {useTranslation} from "react-i18next";

const SelectField = (props)=>{
    const {t} = useTranslation()
    const {label, data, ...rest} =props
    const [field, meta]= useField(props)
    const {value:selectedValue} = field
    const [touched, error] = at(meta, "touched", "error")
    const isError = touched && error && true
    const _renderHelperText =()=>{
        if(isError){
            return <FormHelperText>{t(error)}</FormHelperText>
        }
    }

    return(
        <FormControl {...rest} error={isError} variant={"outlined"}>
            <InputLabel>{label}</InputLabel>
            <Select {...field} value={selectedValue? selectedValue:""}>
                {data.map((item, index)=>(<MenuItem key={index} value={item.value}>{item.label}</MenuItem>))}
            </Select>
            {_renderHelperText()}
        </FormControl>
    )
}

SelectField.defaultProps={
    data:[]
}

SelectField.propTypes ={
    data:PropTypes.array.isRequired
};


export default SelectField
