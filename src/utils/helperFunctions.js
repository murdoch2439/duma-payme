import {
    CHANGE_MODAL_STATES, CLIENT_FOR_MOBILE_PAYMENT,
    currencies,
    DEBIT_CARD,
    FAILED,
    MOBILE_MONEY,
    SHOW_FAIL_MODAL,
    SHOW_PENDING_MODAL,
    SHOW_SUCCESS_MODAL,
    SUCCEEDED,
    SUCCESS,
    // IP_PROVIDER_API_KEY,
} from "../constants/variableNames";
import {PaymentGatewayService} from "../api";

const nameFormating = (string) =>{
    const splitted = string.split(' ')
    for (let i = 0; i < splitted.length; i++){
      splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)
    }
   return splitted.join(' ')
}

const sendingAmount = ({currency, amount,}) =>{
    if(currency === currencies.USD){
        return `$ ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.EUR){
        return `€ ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.GBP){
        return `£ ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.CAD){
        return `CA$ ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.ZAR){
        return `ZAR ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.CHF){
        return `CHF ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.SEK){
        return `SEK ${parseInt(amount).toFixed(2)}`
    }
}

const totalToPay = ({currency, amount, }) =>{
    if(currency === currencies.USD){
        return `$ ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.EUR){
        return `€ ${parseInt(amount).toFixed(2)} ${currency}`
    }if(currency === currencies.GBP){
        return `£ ${parseInt(amount).toFixed(2)} ${currency}`
    }if(currency === currencies.CAD){
        return `CA$ ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.ZAR){
        return `ZAR ${parseInt(amount).toFixed(2)}`
    }if(currency === currencies.CHF){
        return `CHF ${parseInt(amount).toFixed(2)} `
    }if(currency === currencies.SEK){
        return `SEK ${parseInt(amount).toFixed(2)}`
    }
}


const receivingAmount =({currency, amount, clientCurrency, rate}) =>{
        if(!currency){
            return `$ 00.00`
        }else{
            if(currency === currencies.USD){
                if(currency === clientCurrency){
                    return `$ ${parseInt(amount).toFixed(2)}`
                }else{
                    return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)} ${clientCurrency}`
                }
            }if(currency === currencies.EUR){
                  if(currency === clientCurrency){
                      return `€ ${parseInt(amount).toFixed(2)}`
                  }else{
                      return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)} ${clientCurrency}`
                  }
            }if(currency === currencies.GBP){
                if(currency === clientCurrency){
                    return `£ ${parseInt(amount).toFixed(2)}`
                }else{
                    return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)} ${clientCurrency}`
                }
            }if(currency === currencies.CAD){
                if(currency === clientCurrency){
                    return `CA$ ${parseInt(amount).toFixed(2)}`
                }else{
                    return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)} ${clientCurrency}`
                }
            }if(currency === currencies.ZAR){
                if(currency === clientCurrency){
                    return `ZAR ${parseInt(amount).toFixed(2)} `
                }else{
                    //add ${clientCurrency}  in the template string before amount
                    return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`

                }
            }if(currency === currencies.SEK){
                if(currency === clientCurrency){
                     return `SEK ${parseInt(amount).toFixed(2)}`
                }else{
                    return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)} ${clientCurrency}`
                }
            }if(currency === currencies.CHF){
                if(currency === clientCurrency){
                    return `CHF ${parseInt(amount).toFixed(2)}`
                }else{
                    return `${(parseInt(amount) * parseFloat(rate)).toFixed(2)} ${clientCurrency}`
                }
            }
        }
}


const businessLogicManager = ({currency, amount, clientCurrency, rate}) =>{
        if(!currency){
            return `$ 00.00`
        }if(currency !== clientCurrency && currency === currencies.USD){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }if(currency === clientCurrency){
                return  `€ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
            }else{
                  return `$ ${parseInt(amount).toFixed(2)}`
              }
        }if(currency !== clientCurrency &&  currency === currencies.EUR){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }else{
                  return  `€ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
              }
        }if(currency !== clientCurrency && currency === currencies.GBP){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }else{
                  return  `£ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
              }
        }if(currency !== clientCurrency && currency === currencies.CAD){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }else{
                  return  `CA$ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
              }
        }
}

const  getUrlParams =()=> {
    let  vars = {};
     window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value)=> {
        vars[key] = value;
    });
    return vars;
}


const backgroundChanger = (loading) =>{
    if(!loading){
        return '#FBB900'
    }else{
        return '#f5f5f5'
    }
}

const currencyManager = (currency) =>{
    if(currency === currencies.USD){
        return  "$"
    } if(currency === currencies.EUR){
        return "€"
    }if(currency === currencies.GBP){
        return "£"
    }if(currency === currencies.CAD){
        return "CA$"
    }if(currency === currencies.ZAR){
        return "ZAR"
    }
}

const firstThreeDigit = string => string.substring(0,3)

// const getClientIpAddress = async() =>{
//     try{
//         const response = await axios.get(`https://api.ipdata.co/?api-key=${IP_PROVIDER_API_KEY}`)
//         // const getGeoDB = await axios.get("https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0/197.157.209.57")
//         return response.data.ip
//     }catch(error){
//         console.log("Couldn't get user Ip adress ==> :", error.response)
//     }
// }

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
const paymentMethods =[
    {
        value:DEBIT_CARD,
        label:'Debit card',
    },
    {
        value:MOBILE_MONEY,
        label:'Mobile Money',
    },
]

const responseManager = ({response, formValues, option}) =>{

    formValues.currency = response.data.currency
    formValues.transactionReference = response.data.reference
    formValues.receiverLogo = response.data.clientLogo
    formValues.clientCurrency = response.data.clientCurrency !== null ? response.data.clientCurrency : "*****"
    formValues.clientName = response.data.clientName
    formValues.receiverName = response.data.receiverName
    formValues.paymentRequestId = response.data.paymentRequestId
    formValues.error = response.data.error
    formValues.code = response.data.code
    formValues.clientKey=response.data.clientKey
    if(response.data.rate){
        formValues.rate = response.data.rate
    }if(response.data.callBackUrl){
        formValues.callBackUrl = response.data.callBackUrl
    }if(response.data.amount){
        if(option){
            formValues.amount = response.data.amount
        }
    }
}


function userInterfaceBasedOnMobilePaymentResponseManager(infoCollection){
    const {response, dispatch, setLoading} =infoCollection
    if(response.data.status === SUCCESS){
        setLoading(false);
        // setTimeout(()=>{
        dispatch({
            type: CHANGE_MODAL_STATES,
            key: SHOW_PENDING_MODAL,
            value: true
        })

        //     setLoading(false);
        // }, 3000)

    }if(response.data.status === FAILED){

        setLoading(false);
        dispatch({
            type: CHANGE_MODAL_STATES,
            key: SHOW_FAIL_MODAL,
            value: true
        })
        console.log("Response when mobile money status is failed  : ",response.data)

    }else{
        setLoading(false);
        console.log(response.data)
    }

}



async function bankCardsPaymentManager(infoCollection) {
    const {paymentIntent, formValues, setLoading, setDisabled, dispatch, error} = infoCollection

    if (paymentIntent && paymentIntent.status === SUCCEEDED) {
        formValues.paymentIntent = paymentIntent.id
        // dispatch({
        //     type: CHANGE_MODAL_STATES,
        //     key: SHOW_SUCCESS_MODAL,
        //     value: true
        // })
        const paymentIntentObjet = {

            reference: formValues.transactionReference,
            receivingAmount: (parseInt(formValues.amount) * parseFloat(formValues.rate)).toFixed(2),
            sendingAmount: parseInt(formValues.amount),
            paymentIntentId: paymentIntent.id,
            paymentRequestId: formValues.paymentRequestId,
            fee: formValues.fees,
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
        }


        const responseFromBffValidation = await PaymentGatewayService.validate(paymentIntentObjet)

        console.log('Payload for validation ===>', responseFromBffValidation.data)
        if (responseFromBffValidation.data.status === SUCCESS) {
            console.log('payment process succeeded')
            setLoading(false);
            setDisabled(true)
            dispatch({
                type: CHANGE_MODAL_STATES,
                key: SHOW_SUCCESS_MODAL,
                value: true
            })


        }

    }
    if (error) {
        // setError(error.message);
        console.log('Error on stripe payment confirmation ===>', error)

        dispatch({
            type: CHANGE_MODAL_STATES,
            key: SHOW_FAIL_MODAL,
            value: true
        })
    }

}


function getPayloadForMobileMoney(formValues){
    return  {
        initials: formValues.name,
        surname:formValues.name,
        email:formValues.email,
        phone:formValues.phone,
        currency: formValues.currency,
        amount: formValues.amount,
        transfRefNo: formValues.transactionReference,
        paymentRequestId: formValues.paymentRequestId,
        service: firstThreeDigit(formValues.phone),
        client: CLIENT_FOR_MOBILE_PAYMENT
    }

}







export {
    responseManager,
    backgroundChanger,
    nameFormating,
    languages,
    paymentMethods,
    getUrlParams,
    businessLogicManager,
    receivingAmount,
    totalToPay,
    sendingAmount,
    currencyManager,
    firstThreeDigit,
    userInterfaceBasedOnMobilePaymentResponseManager,
    bankCardsPaymentManager,
    getPayloadForMobileMoney

}
