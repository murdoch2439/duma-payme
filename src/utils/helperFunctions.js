import {Currencies} from "./currencies";

export  const transformToUpCase = (word) =>{
      return word.toUpperCase()
   }

   export const nameFormating = (string) =>{
        const splitted = string.split(' ')

        for (let i = 0; i < splitted.length; i++){

          splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)

        }
       return splitted.join(' ')
      }


      export  const currencyManager = (currency, amount ) =>{
          if(currency === 'USD'){
              if(isNaN(amount) || amount === null){
                  return `$ 00.00`
              }else{
                  return `$ ${parseInt(amount).toFixed(2)}`
              }

          }
          if(currency === 'EUR'){
            return  `€ ${parseInt(amount).toFixed(2)}`
          }

      }


export const urlParamsFormater =(text) =>{
       return  text.split('=')[1]
     }


export const  getUrlParams =()=> {
    let  vars = {};
     window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value)=> {
        vars[key] = value;
    });
    return vars;
}

export const getUrlPath =()=>{
    // home = home.substr(0, home.lastIndexOf('/'))
    // console.log('path ==>',path)
    return window.location.pathname.split('/')[1]
}

export const findCurrency = (currency) =>{
    return Currencies.filter(currencyObject => {
        return currencyObject.code.indexOf(currency.toUpperCase) >= 0
    })

}

export   const backgroundChanger = (loading) =>{
    if(!loading){
        return '#FBB900'
    }else{
        return '#f5f5f5'
    }
}
