
const nameFormating = (string) =>{
    const splitted = string.split(' ')

    for (let i = 0; i < splitted.length; i++){

      splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)

    }
   return splitted.join(' ')
}

const sendingAmount = ({currency, amount,}) =>{

      return  currency === "USD" ? `$ ${parseInt(amount).toFixed(2)}`: `€ ${parseInt(amount).toFixed(2)}`

}

const totalToPay = ({currency, amount, }) =>{
return  currency === "USD" ? `$ ${parseInt(amount).toFixed(2)} ${currency}`: `€ ${parseInt(amount).toFixed(2)} ${currency}`
}

const receivingAmount =({currency, amount, clientCurrency, rate}) =>{

        if(!currency){
            return `$ 00.00`
        }else{
            if(currency === "USD"){
                if(currency === clientCurrency){
                    return `$ ${parseInt(amount).toFixed(2)}`
                }else{
                    return `$ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
                }
            }
              if(currency === "EUR"){
                  if(currency === clientCurrency){
                      return `€ ${parseInt(amount).toFixed(2)}`
                  }else{
                      return `$ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
                  }

            }

        }
      }

const businessLogicManager = ({currency, amount, clientCurrency, rate}) =>{

        if(!currency){
            return `$ 00.00`
        }
        if(currency !== clientCurrency && currency === "USD"){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }if(currency === clientCurrency){
                return  `€ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`

            }else{
                  return `$ ${parseInt(amount).toFixed(2)}`
              }

          }
          if(currency !== clientCurrency &&  currency === 'EUR'){
              if(isNaN(amount) || amount === null || amount === undefined){
                  return `$ 00.00`
              }else{
                  return  `€ ${(parseInt(amount) * parseFloat(rate)).toFixed(2)}`
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

const responseManager = ({response, formValues}) =>{

    formValues.currency = response.data.currency
    formValues.transactionReference = response.data.reference
    formValues.receiverLogo = response.data.clientLogo
    formValues.clientCurrency = response.data.clientCurrency
    formValues.clientName = response.data.clientName
    formValues.receiverName = response.data.receiverName
    formValues.paymentRequestId = response.data.paymentRequestId
    formValues.error = response.data.error
    formValues.code = response.data.code
    if(response.data.rate){
        formValues.rate = response.data.rate
    }
    if(response.data.callBackUrl){
        formValues.callBackUrl = response.data.callBackUrl
    }if(response.data.amount){
        formValues.amount = response.data.amount
    }
}

export {responseManager, backgroundChanger, nameFormating, languages, getUrlParams, businessLogicManager, receivingAmount, totalToPay, sendingAmount}
