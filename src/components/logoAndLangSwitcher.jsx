import React, {useState} from 'react'
import {Box, FormControl,  MenuItem, TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useTranslation} from "react-i18next";
import {ENGLISH_LANG_CODE, FRENCH_LANG_CODE} from "../constants/variableNames";
import logDuma from "../assets/duma1.png";
import {languages} from "../utils/helperFunctions";

const useStyles = makeStyles(() => ({
    dumaLogoAndLangContainer:{
        width:'100%',
        justifyContent:'space-between',
        paddingBottom:10,
    },
    logoDuma: {
        width:30,
    },
}));

const LogoAndLangSwitcher = () =>{
    const classes = useStyles();
    const [language, setLanguage] = useState(ENGLISH_LANG_CODE)
    const {t, i18n} = useTranslation()

    const onClickHandler =(lang)=>{
        i18n.changeLanguage(lang).then()
    }

    return(
        <Box className={classes.dumaLogoAndLangContainer} sx={{display: { xs: 'flex', sm:'none', md: 'none' }, justifyContent:'space-between'}}>
            <img src={logDuma} alt='logo' className={classes.logoDuma} />
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
