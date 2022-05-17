import axios from "axios"
import {IP_PROVIDER_API_KEY, ONLINE_BACK_END_PORT} from "../constants/variableNames";

export const Payment={
    baseUrl:axios.create({
        baseUrl:`http://${ONLINE_BACK_END_PORT}:3001/api`
    }),
    getClientIpAddress: async function (){
        try{
            const {data:{ip}} = await axios.get(`https://api.ipdata.co/?api-key=${IP_PROVIDER_API_KEY}`)
            return ip
        }catch(error){
            return console.log("Did not get the Ip address ==>", error)
        }
    },
    init:function(paymentInfo){
        return this.baseUrl.post("/payment-init", paymentInfo )
    },
    stripeInit:function(initInfo){
         return this.baseUrl.post("/create-payment-intent", initInfo )
    },
    validate:function(validateThis){
        return this.baseUrl.post("/validate", validateThis )
    },
    mobileMoney:function(payloadForMobileMoney){
        return this.baseUrl.post("/mobile-money-payment", payloadForMobileMoney)
    },
}


