import axios from "axios"
import {ONLINE_BACK_END_PORT} from "../constants/variableNames";


export default axios.create({
    baseUrl:`http://${ONLINE_BACK_END_PORT}:3001/api/`
})


