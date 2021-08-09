export  const transformToUpCase = (word) =>{
      return word.toUpperCase()
   }

   export const nameFormating = (string) =>{
        const splitted = string.split(' ')

        for (let i = 0; i < splitted.length; i++){
        
          splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1)
          
        }
        const result = splitted.join(' ')
        return result
      }


      export  const currencyManager = (currency, amount ) =>{
          if(currency === 'USD'){
            return `$ ${amount}`
          }
          if(currency === 'EUR'){
            return  `€ ${amount}`
          }

      }


export const urlParamsFormater =(text) =>{
       return text = text.split('=')[1]
     }


export const  getUrlParams =()=> {
    let  vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value)=> {
        vars[key] = value;
    });
    return vars;
}
