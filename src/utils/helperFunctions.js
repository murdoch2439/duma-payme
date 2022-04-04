import {currencies, DEBIT_CARD, IP_PROVIDER_API_KEY, } from "../constants/variableNames";
import axios from "axios";

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
    }
}

const totalToPay = ({currency, amount, }) =>{
    if(currency === currencies.USD){
        return `$ ${parseInt(amount).toFixed(2)} ${currency}`
    }if(currency === currencies.EUR){
        return `€ ${parseInt(amount).toFixed(2)} ${currency}`
    }if(currency === currencies.GBP){
        return `£ ${parseInt(amount).toFixed(2)} ${currency}`
    }if(currency === currencies.CAD){
        return `CA$ ${parseInt(amount).toFixed(2)} ${currency}`
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
// export const getUrlPath =()=>{
//     // home = home.substr(0, home.lastIndexOf('/'))
//     // console.log('path ==>',path)
//     return window.location.pathname.split('/')[1]
// }

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
    }
}

const firstThreeDigit = string => string.substring(0,3)
const getClientIpAddress = async() =>{
    try{
        const response = await axios.get(`https://api.ipdata.co/?api-key=${IP_PROVIDER_API_KEY}`)
        // const getGeoDB = await axios.get("https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0/197.157.209.57")
        return response.data.ip
    }catch(error){
        console.log("Couldn't get user Ip adress ==> :", error.response)
    }
}

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
    // {
    //     value:MOBILE_MONEY,
    //     label:'Mobile Money',
    // },
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

export {
    responseManager,
    backgroundChanger,
    nameFormating,
    languages,
    paymentMethods,
    getUrlParams,
    businessLogicManager,
    receivingAmount,
    totalToPay, sendingAmount, currencyManager, getClientIpAddress, firstThreeDigit }
