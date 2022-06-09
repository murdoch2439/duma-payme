import React, {useState, useEffect} from 'react';
import {Grid,Typography, TextField, FormControl, MenuItem,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { paymentMethods, } from '../../utils/helperFunctions';
import {
    EDIT_FORM_VALUES,
    STARS_FOR_NO_CONTENT, currencies,
} from '../../constants/variableNames';
import ListItemText from "@material-ui/core/ListItemText";
import {useTranslation} from "react-i18next";
import ConfirmationDialog from "../../components/modals/confirmationModal";


const useStyles = makeStyles({
    input:{
        borderWidth:0.3,
    },
    listItem: {
        color:'black'
    },
    listItemText:{
        fontWeight:'800',
        color:'black'
    },
    total: {
        fontWeight: 'bold',
        color:'black'
    },
    header:{
        display:"flex",
        justifyContent:"space-between",
        // alignItems:'center',
        paddingTop:0,
        marginTop:0,
    }
});


const GatewayFormStepOne =()=> {
    const classes = useStyles();
    const [{ formValues }, dispatch] = useStateValue();
    const [currency, setCurrency] = useState('')
    const [amount, setAmount] = useState("1")
    const [errorName, setErrorName] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [paymentMeth, setPaymentMeth] = useState('')
    const {t} = useTranslation()

    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    useEffect(()=>{
            setCurrency(formValues.currency)
            setAmount(formValues.amount)
    },[formValues.currency, formValues.amount])

    const currencyManager = () =>{
        if(currency){
            return currency
        }else{
            return STARS_FOR_NO_CONTENT
        }
    }


    const amountManager = () =>{
        if(currency === currencies.USD){
            return `${parseInt(amount).toFixed(2)} $`
        }if(currency === currencies.EUR){
            return `${parseInt(amount).toFixed(2)} €`
        }if(currency === currencies.GBP){
        return `${parseInt(amount).toFixed(2)} £`
        }if(currency === currencies.CAD){
            return `${parseInt(amount).toFixed(2)} ${currencies.CAD}`
        }if(currency === currencies.ZAR){
            return `${currencies.ZAR} ${parseInt(amount).toFixed(2)}`
        }if(currency === currencies.SEK){
            return `${parseInt(amount).toFixed(2)} ${currencies.SEK}`
        }if(currency === currencies.CHF){
            return `${parseInt(amount).toFixed(2)} ${currencies.CHF}`
        }else{
            return STARS_FOR_NO_CONTENT
        }
    }


    return (
        <Grid>
            <Grid item  xs={12} >
                <Grid item xs={12} sm={12} md={12} className={classes.header} display={{ xs: 'block',sm:'inline', md:'flex' }}>
                    <Grid item  sm={6} md={6} xs={12}>
                        <Typography variant="h6">{t("Payment Information")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} style={{ display:'flex', justifyContent:"flex-end", }}>

                        <ConfirmationDialog />
                    </Grid>
                </Grid>

                <List>
                    <ListItem className={classes.listItem} >
                        <ListItemText primary={t('Currency :')} className={classes.listItemText}  />
                        <Typography variant="body1" style={{fontWeight:'500'}}>{currencyManager()}</Typography>
                    </ListItem>
                    <ListItem className={classes.listItem} style={{backgroundColor:'#F1F5F6',  borderRadius:5,}} >
                        <ListItemText primary={t('Total :')} className={classes.listItemText}  />
                        <Typography variant="body1" style={{fontWeight:'500'}}>{amountManager()}</Typography>
                    </ListItem>
                </List>
                <div style={{height:0.1, marginTop:10, backgroundColor:'#C4C4C4'}}/>
            </Grid>
            <Grid container spacing={5} style={{ marginTop:0,marginBottom:0}}  >
                <Grid item xs={12} sm={6} md={6} >
                    <TextField
                        label={t("Name on the card")}
                        name="name"
                        type={"text"}
                        variant="outlined"
                        maxLength={10}
                        required
                        fullWidth
                        value={formValues.name}
                        onChange={e =>{
                            dispatch({
                                type: EDIT_FORM_VALUES,
                                key: "name",
                                value: e.target.value
                            })
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label={t("Email address")}
                        name="email"
                        variant="outlined"
                        type="email"
                        required
                        fullWidth
                        maxLength={"25"}
                        error={errorName}
                        helperText={ errorName ? `${errorMessage}`:null}
                        value={formValues.email}
                        onChange={e =>{
                            dispatch({
                                type: EDIT_FORM_VALUES,
                                key: "email",
                                value: e.target.value
                            })
                            if(!emailFormat.test(e.target.value)){
                                setErrorName(true)
                                setErrorMessage('mail not valid')
                            }else{
                                setErrorName(false)
                            }
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        label={t("Phone Number")}
                        name="phone"
                        variant="outlined"
                        type="tel"
                        maxLength="20"
                        required
                        fullWidth
                        value={formValues.phone}
                        onChange={e =>{
                            dispatch({
                                type: EDIT_FORM_VALUES,
                                key: "phone",
                                value: e.target.value
                            })
                        }
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl style={{minWidth: '100%',}}>
                        <TextField
                            required
                            variant="outlined"
                            select
                            label={t("Payment method")}
                            value={formValues.paymentMethod === '' ? paymentMeth : formValues.paymentMethod}
                            onChange={(e) => {
                                setPaymentMeth(e.target.value)
                                formValues.paymentMethod = e.target.value
                            }}
                        >
                            {
                                paymentMethods.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {t(option.label)}
                                </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default GatewayFormStepOne
