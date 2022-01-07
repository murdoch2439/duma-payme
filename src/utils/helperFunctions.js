// import {Currencies} from "./currencies";
// import {useTranslation} from "react-i18next";

// export  const transformToUpCase = (word) =>{
//       return word.toUpperCase()
//    }

   export const nameFormating = (string) =>{
        const splitted = string.split(' ')

        for (let i = 0; i < splitted.length; i++){

          splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)

        }
       return splitted.join(' ')
      }


      export  const currencyManager = (currency, amount ) =>{
        if(!currency){
            return `$ 00.00`
        }
        if(currency === 'USD'){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }else{
                  return `$ ${parseInt(amount).toFixed(2)}`
              }

          }
          if(currency === 'EUR'){
            return  `€ ${parseInt(amount).toFixed(2)}`
          }

      }


// export const urlParamsFormater =(text) =>{
//        return  text.split('=')[1]
//      }


export const  getUrlParams =()=> {
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

// export const findCurrency = (currency) =>{
//     return Currencies.filter(currencyObject => {
//         return currencyObject.code.indexOf(currency.toUpperCase) >= 0
//     })
//
// }

export   const backgroundChanger = (loading) =>{
    if(!loading){
        return '#FBB900'
    }else{
        return '#f5f5f5'
    }
}

export    const languages=[
    {
        value:"en",
        label:"English"
    },
    {
        value:"fr",
        label:"French"
    }
]

export const responseManager = ({response, formValues}) =>{

    formValues.currency = response.data.currency
    formValues.transactionReference = response.data.reference
    formValues.receiverLogo = response.data.clientLogo
    formValues.clientCurrency = response.data.clientCurrency
    formValues.clientName = response.data.clientName
    formValues.receiverName = response.data.receiverName
    formValues.paymentRequestId = response.data.paymentRequestId
    formValues.error = response.data.error
    formValues.code = response.data.code
    if(response.data.callBackUrl){
        formValues.callBackUrl = response.data.callBackUrl
    }if(response.data.amount){
        formValues.amount = response.data.amount
    }


}

// export const languageSwitcher = () =>{
//
// }
