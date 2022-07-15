import React, {useEffect, useState} from 'react'
import {Box, FormControl,  MenuItem, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";
import {ENGLISH_LANG_CODE, FRENCH_LANG_CODE, MERCHANT_KEY_STRING} from "../constants/variableNames";
import logDuma from "../assets/duma1.png";
import {getUrlParams, languages} from "../utils/helperFunctions";
import cover from "../assets/Trip-assurances (4).png";

const useStyles = makeStyles(() => ({
    dumaLogoAndLangContainer:{
        width:'100%',
        justifyContent:'space-between',
        paddingBottom:10,
    },
    logoDuma: {
        width:30,
    },
    clientLogo:{
        width:40,
    }
}));

const LogoAndLangSwitcher = () =>{
    const classes = useStyles();
    const [language, setLanguage] = useState(ENGLISH_LANG_CODE)
    const {t, i18n} = useTranslation()
    const merchantKey = getUrlParams()[MERCHANT_KEY_STRING]
    useEffect(()=>{
        setLanguage(i18n.language)
    },[])

    const onClickHandler =(lang)=>{
        i18n.changeLanguage(lang).then()
    }

    return(
        <Box className={classes.dumaLogoAndLangContainer} sx={{display: { xs: 'flex', sm:'none', md: 'none' }, justifyContent:'space-between'}}>
            <img src={logDuma} alt='logo' className={classes.logoDuma} />
            <img src={ merchantKey ? `https://dumacash-resources.s3.eu-west-1.amazonaws.com/organisations/static/${merchantKey}/organisation-logo.png` : cover} alt='logo' onError={(e)=>e.target.src=cover}  className={classes.clientLogo} />
            <FormControl>
                <TextField
                    size={"small"}
                    select
                    name={"language"}
                    value={language}
                    onChange={(e)=>{
                        setLanguage(e.target.value)
                        if(language === FRENCH_LANG_CODE){
                            onClickHandler(ENGLISH_LANG_CODE)
                        }else{
                            onClickHandler(FRENCH_LANG_CODE)
                        }
                    }}
                >
                    {languages.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {t(option.label)}
                        </MenuItem>
                    ))
                    }
                </TextField>
            </FormControl>
        </Box>
    )
}
export default LogoAndLangSwitcher
