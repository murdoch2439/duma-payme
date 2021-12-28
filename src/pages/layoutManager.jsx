import React, {useState} from "react";
import {  useHistory
} from "react-router-dom";
import { Container, Paper, Box, Grid, FormControl, TextField, MenuItem } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';

import FormStepsManager from './formStepsManager'
import GatewayFormStepsManager from './gatewayFormStepsManager'
import { useStateValue } from "../context";
import cover from '../assets/Trip-assurances (4).png'
import logDuma from '../assets/duma1.png'
import SuccessModal from "./successPage";
import FailureModal from "./failurePage";
import PendingModal from "./pendingPage";
import {getUrlParams} from "../utils/helperFunctions";
import {ADMIN_ID_STRING, ENGLISH_LANG_CODE, FRENCH_LANG_CODE, PAYER_ID_STRING} from "../constants/variableNames";
// import LoadingComponent from "../components/loadingComponent";
// import {CHANGE_MODAL_STATES, SHOW_FAIL_MODAL, SHOW_PENDING_MODAL} from "../constants/variableNames";
import {useTranslation} from "react-i18next";

const useStyles = makeStyles(() => ({

    container: {
        backgroundColor:'white',
        // backgroundImage:`url(https://cdn.goodao.net/easypetgarden/H6dd2a1363c0042738024ab6ee5ffb470G.jpg)`,
        borderRadius:10,
        display:'flex',
    },
    leftContainerWrapper:{
      width:'75%',
        // backgroundImage:`url(${cover})` ,
      textAlign:'center'
    },
    imagesBox:{
        // backgroundImage:`url(${cover})`,
        height:'100%',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    dumaLogoAndLangContainer:{
        display:'flex',
        justifyContent:'space-between'
    },
    logoDuma: {
        width:50,
    },
    organizationLogo:{
        height:"75%",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    clientLogo:{
        width:250,

    }
}));

const LayoutManager = () => {
    const classes = useStyles();
    const [{  modalStates  }] = useStateValue();
    const [language, setLanguage] = useState(ENGLISH_LANG_CODE)
    const {t, i18n} = useTranslation()
    const history = useHistory()
    const adminId = getUrlParams()[ADMIN_ID_STRING]
    const payerId = getUrlParams()[PAYER_ID_STRING]

    const languages=[
        {
            value:"en",
            label:"English"
        },
        {
            value:"fr",
            label:"French"
        }
    ]


    const onClickHandler =(lang)=>{
        i18n.changeLanguage(lang).then()
    }

    // const [logo, setLogo] = useState('')
    // useEffect(()=>{
    //
    //      if(formValues.receiverLogo === ''){
    //        console.log('formValues.receiverLogo is empty...')
    //      }else{
    //        setLogo(formValues.receiverLogo)
    //      }
    //    }, [formValues.receiverLogo])


          const cardsLogo = [
        "amex",
        "cirrus",
        // "diners",
        // "dankort",
        // "discover",
        // "jcb",
        "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    return (
      <>
          {
              modalStates.showsuccessmodal ? <SuccessModal />:
              modalStates.showfailmodal ? <FailureModal />:
              modalStates.showpendingmodal ? <PendingModal />:
                  <Box mt={10} >
                    <Container maxWidth="md" >
                    <Paper elevation={3}  className={classes.container} >
                          <Box
                              className={classes.leftContainerWrapper}
                              display={{ xs: 'none',sm:'inline', md:'block' }}
                              m={1}
                          >
                              <div className={classes.dumaLogoAndLangContainer}>
                                  <img src={logDuma} alt='logo' className={classes.logoDuma} />
                                      <FormControl>
                                        <TextField
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
                                            ))}

                                        </TextField>
                                      </FormControl>
                                  {/*<img src={logDuma} alt='logo' className={classes.logoDuma} />*/}
                              </div>

                            <div className={classes.imagesBox}>
                                  <div className={classes.organizationLogo}>

                                      {/*CLIENT LOGO GOES HERE */}
                                      {/*{*/}
                                      {/*formValues.receiverLogo === '' ? 'Loading...':*/}
                                      {/*<img src={`https://yayo-resources.s3.eu-west-1.amazonaws.com/icash/me/resources/${logo}/client-logo.png`} alt='logo'  className={classes.clientLogo} />*/}
                                      {/* }*/}
                                      {/*<p>{t("Why")}</p>*/}
                                      <img src={cover} alt='logo' className={classes.clientLogo} />
                                  </div>

                                  <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      style={{ marginTop:10, textAlign:'center',}}
                                  >
                                    {
                                        cardsLogo.map(card => <img key={card} src={`./cards/${card}.png`} alt={card} width="40px" style={{ padding: "0 5px" }} />)
                                    }
                                  </Grid>
                            </div>
                          </Box>

                        {
                            !adminId && payerId  ?
                            <GatewayFormStepsManager
                                onSuccessfulCheckout ={()=> history.replace('/success')}
                                onFailedCheckout ={()=>history.replace('/failure')}
                                onPendingCheckout={()=>history.replace('/payment-pending')}
                            />:
                            <FormStepsManager
                            onSuccessfulCheckout ={()=> history.replace('/success')}
                            onFailedCheckout ={()=>history.replace('/failure')}
                            onPendingCheckout={()=>history.replace('/payment-pending')}
                            />

                        }
                    </Paper>
              </Container>
                  </Box>
          }

      </>

    )
}

export default LayoutManager;
