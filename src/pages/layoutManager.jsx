import React, {useState,} from "react";
import {  useHistory
} from "react-router-dom";
import { Container, Paper, Box, Grid, FormControl, TextField, MenuItem } from "@material-ui/core";
import { makeStyles, } from '@material-ui/core/styles';
import FormStepsManager from './link-payment/formStepsManager'
import GatewayFormStepsManager from './gateway/gatewayFormStepsManager'
import { useStateValue } from "../context";
import cover from '../assets/Icash.jpg'
import logDuma from '../assets/duma1.png'
import SuccessModal from "./successPage";
import FailureModal from "./failurePage";
import PendingModal from "./pendingPage";
import {getUrlParams, languages} from "../utils/helperFunctions";
import {
    ENGLISH_LANG_CODE,
    FRENCH_LANG_CODE, MERCHANT_KEY_STRING,
    OPTION_STRING
} from "../constants/variableNames";
import {useTranslation} from "react-i18next";
import IssuesPage from "./issuesPage";
import CancelledPage from "./cancelledPage";

const useStyles = makeStyles(() => ({
    container: {
        backgroundColor:'white',
        // backgroundSize:'cover',
        // backgroundPosition:'top',
        // backgroundImage:`url(https://th.bing.com/th/id/OIP.tvW-pseWnAcTUZENUQ7VrAHaEe?pid=ImgDet&rs=1)`,
        borderRadius:10,
        display:'flex',
    },
    leftContainerWrapper:{
      width:'75%',
        // backgroundImage:`url(${cover})` ,
        // backgroundImage:`url(https://th.bing.com/th/id/OIP.tvW-pseWnAcTUZENUQ7VrAHaEe?pid=ImgDet&rs=1)`,

    },
    imagesBox:{
        // backgroundImage:`url(${cover})`,

        height:'90%',
        borderBottomLeftRadius:10,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    dumaLogoAndLangContainer:{
        display:'flex',
        justifyContent:'space-between'

    },
    logoDuma: {
        width:50,
    },
    organizationLogo:{
        height:"80%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    clientLogo:{
        width:250,
    },
    cardType: {
        display:'flex',
        alignItems:'flex-end',
        marginBottom:20,
        marginTop:20,
    }
}));

const LayoutManager = () => {
    const classes = useStyles();
    const [{  modalStates  }] = useStateValue();
    const [language, setLanguage] = useState(ENGLISH_LANG_CODE)
    const {t, i18n} = useTranslation()
    const history = useHistory()
    const option= getUrlParams()[OPTION_STRING]
    const merchantKey = getUrlParams()[MERCHANT_KEY_STRING]

    const onClickHandler =(lang)=>{
        i18n.changeLanguage(lang).then()
    }
    const cardsLogo = [
        "amex",
        "cirrus",
        "diners",
        // "dankort",
        // "discover",
        // "jcb",
        // "maestro",
        "mastercard",
        "visa",
        "visaelectron",
    ];

    return (
      <>
          {
              modalStates.showsuccessmodal ? <SuccessModal />:
              modalStates.showfailmodal ? <FailureModal />:
              modalStates.showcancelledmodal ? <CancelledPage />:
              modalStates.showpendingmodal ? <PendingModal />:
              modalStates.showaccessdeniedmodal ? <IssuesPage />:
                  <Box  mt={10}>
                    <Container maxWidth="md">
                    <Paper elevation={3}  className={classes.container}>
                          <Box
                              className={classes.leftContainerWrapper}
                              display={{ xs: 'none',sm:'inline', md:'block' }}
                              m={1}
                          >
                              <Box className={classes.dumaLogoAndLangContainer}>
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
                              </Box>
                            <div className={classes.imagesBox}>
                                  <div className={classes.organizationLogo}>
                                      <img
                                          src={
                                              merchantKey ?
                                                  `https://dumacash-resources.s3.eu-west-1.amazonaws.com/organisations/static/${merchantKey}/organisation-logo.png` :
                                                  cover
                                          }
                                          alt='logo'
                                          className={classes.clientLogo}
                                          onError={(e)=>e.target.src=cover}
                                      />
                                      <Grid
                                          item
                                          xs={12}
                                          sm={8}
                                          md={12}
                                          className={classes.cardType}
                                      >
                                          <div>
                                              {
                                                  cardsLogo.map(card => <img key={card} src={`./cards/${card}.png`} alt={card} width="40px" style={{ padding: "0 5px" }} />)
                                              }
                                          </div>
                                      </Grid>
                                  </div>
                            </div>
                          </Box>
                        {
                            option  ?
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
