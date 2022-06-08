import axios from "axios"
import {IP_PROVIDER_API_KEY, ONLINE_BACK_END_PORT} from "../constants/variableNames";

export const Payment={
    baseUrl:axios.create({
        baseURL:`http://${ONLINE_BACK_END_PORT}:3001/api`
    }),
    getClientIpAddress: async function (){
        try{
            const {data:{ip}} = await axios.get(`https://api.ipdata.co/?api-key=${IP_PROVIDER_API_KEY}`)
            return ip
        }catch(error){
            return console.log("Did not get the Ip address ==>", error)
        }
    },
    init: async function(paymentInfo){
        return await this.baseUrl.post("/payment-init", paymentInfo )
    },
    stripeInit: async function(initInfo){
         const {data:clientSecret} = await this.baseUrl.post("/create-payment-intent", initInfo )
        return clientSecret
    },
    validate: async function(validateThis){
        return await this.baseUrl.post("/validate", validateThis )
    },
    mobileMoney: async function(payloadForMobileMoney){
        return await this.baseUrl.post("/mobile-money-payment", payloadForMobileMoney)
    },
}


