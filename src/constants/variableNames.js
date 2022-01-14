const MERCHANT_KEY_STRING = "merchantKey"
const PAYMENT_REQUEST_ID_STRING = "paymentRequestId"
const OPTION_STRING = "op"
// export const BFF_IP = "18.200.191.178"
const ONLINE_BACK_END_PORT = "54.154.208.240"
// const ONLINE_BACK_END_PORT = "192.168.1.165"
// const ONLINE_BACK_END_PORT = "192.168.8.103"
// export const serverLive = "https://duma-payme-backend.herokuapp.com"
// export const CURRENCY = "currency"
const API_PAYMENT_INIT =  `http://${ONLINE_BACK_END_PORT}:3001/api/payment-init`
// export const API_DUMA_PAY_CLIENT_REDIRECT_INIT=`http://${ONLINE_BACK_END_PORT}:3001/api/payment-redirect`
const API_VALIDATE_PAYMENT_INTENT = `http://${ONLINE_BACK_END_PORT}:3001/api/validate`
const API_CREATE_PAYMENT_INTENT = `http://${ONLINE_BACK_END_PORT}:3001/api/create-payment-intent`
const HEALTH_CHECK = `http://${ONLINE_BACK_END_PORT}:3001/api/check`
const DEBIT_CARD = "debit card"
const MOBILE_MONEY = "mobile money"
const EDIT_FORM_VALUES = 'editFormValue'
const FORM_EMPTY_VALUES ="emptyFormValues"
const CHANGE_MODAL_STATES = "changeModalState"
// export const SENDER_NAME = "name"
// export const SENDER_EMAIL = "email"
// export const AMOUNT_TO_SEND = "amount"
// export const RECEIVER_NAME ="receiverName"
const SHOW_SUCCESS_MODAL = "showsuccessmodal"
const SHOW_FAIL_MODAL = "showfailmodal"
const SHOW_PENDING_MODAL = "showpendingmodal"
const SHOW_ACCESS_DENIED_MODAL = "showaccessdeniedmodal"
const SUCCEEDED ="succeeded"
const PAY_NOW = "Pay Now"
const Next_STEP = "Next"
const PREVIOUS_STEP = "Back"
const LOADING_MESSAGE = 'Processing...'
const ENGLISH_LANG_CODE = "en"
const FRENCH_LANG_CODE = "fr"
const CODE_403 ="403"
const CODE_500 ="500"

export {
    MERCHANT_KEY_STRING, PAYMENT_REQUEST_ID_STRING, OPTION_STRING, ONLINE_BACK_END_PORT, API_PAYMENT_INIT, API_VALIDATE_PAYMENT_INTENT, API_CREATE_PAYMENT_INTENT, DEBIT_CARD, MOBILE_MONEY, EDIT_FORM_VALUES, FORM_EMPTY_VALUES, CHANGE_MODAL_STATES, SHOW_SUCCESS_MODAL, SHOW_FAIL_MODAL, SHOW_PENDING_MODAL, SHOW_ACCESS_DENIED_MODAL, SUCCEEDED, PAY_NOW, Next_STEP, PREVIOUS_STEP, LOADING_MESSAGE, ENGLISH_LANG_CODE, FRENCH_LANG_CODE, CODE_403, CODE_500, HEALTH_CHECK
}
