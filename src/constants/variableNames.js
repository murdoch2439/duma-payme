const MERCHANT_KEY_STRING = "merchantKey"
const PAYMENT_REQUEST_ID_STRING = "paymentRequestId"
const OPTION_STRING = "op"
const PUBLIC_KEY ="pk_test_51HmTx0HCv5EZsojRR9OHO3ZjCtAdXHitItIwtpiglZIU5Pt890WkWyJldUuZcnXTLFnh03Tq7lDOIuqImfvymTNI00aA7pd1ox"
// const PUBLIC_KEY = "pk_test_51J8ifiJQ1zXpJJ2OZ6BarkiBEUeCmARiEMx2cp3ZI4cDSTWJ15AHTy1HWREb7HrObRwXcsneRfbLXvo5IQKQWM2000bkx3L5tB"
// export const BFF_IP = "18.200.191.178"
// const ONLINE_BACK_END_PORT = "54.154.208.240"
const ONLINE_BACK_END_PORT = "192.168.1.101"
// export const CURRENCY = "currency"
const API_PAYMENT_INIT =  `http://${ONLINE_BACK_END_PORT}:3001/api/payment-init`
const IP_PROVIDER_API_KEY = "44f0e7d529f599f5285f2bb5c8642eefbd77c2dd8cc187a61fca9a0d"
const API_VALIDATE_PAYMENT_INTENT = `http://${ONLINE_BACK_END_PORT}:3001/api/validate`
const API_CREATE_PAYMENT_INTENT = `http://${ONLINE_BACK_END_PORT}:3001/api/create-payment-intent`
const API_MOBILE_MONEY_PAYMENT_INIT = `http://${ONLINE_BACK_END_PORT}:3001/api/mobile-money-payment`
// const HEALTH_CHECK = `http://${ONLINE_BACK_END_PORT}:3001/api/check`
const DEBIT_CARD = "debit card"
const EMPTY_STRING = ""
const MOBILE_MONEY = "mobile money"
const EDIT_FORM_VALUES = 'editFormValue'
const FORM_EMPTY_VALUES ="emptyFormValues"
const CHANGE_MODAL_STATES = "changeModalState"
const SHOW_SUCCESS_MODAL = "showsuccessmodal"
const SHOW_FAIL_MODAL = "showfailmodal"
const SHOW_PENDING_MODAL = "showpendingmodal"
const SHOW_ACCESS_DENIED_MODAL = "showaccessdeniedmodal"
const SUCCEEDED ="succeeded"
const SUCCESS = "success"
const PAY_NOW = "Pay Now"
const Next_STEP = "Next"
const PREVIOUS_STEP = "Back"
const LOADING_MESSAGE = 'Processing...'
const ENGLISH_LANG_CODE = "en"
const FRENCH_LANG_CODE = "fr"
const CODE_403 ="403"
const CODE_500 ="500"
const currencies = {
    USD: "USD",
    EUR: "EUR",
    GBP: "GBP",
    CAD: "CAD",
}
const USD = "USD"


const CLIENT_FOR_MOBILE_PAYMENT = "ICASH_PAY"
const STARS_FOR_NO_CONTENT = "*****"


export {
    MERCHANT_KEY_STRING, PAYMENT_REQUEST_ID_STRING, OPTION_STRING, ONLINE_BACK_END_PORT, API_PAYMENT_INIT, API_VALIDATE_PAYMENT_INTENT, API_CREATE_PAYMENT_INTENT, DEBIT_CARD, MOBILE_MONEY, EDIT_FORM_VALUES, FORM_EMPTY_VALUES, CHANGE_MODAL_STATES, SHOW_SUCCESS_MODAL, SHOW_FAIL_MODAL, SHOW_PENDING_MODAL, SHOW_ACCESS_DENIED_MODAL, SUCCEEDED, PAY_NOW, Next_STEP, PREVIOUS_STEP, LOADING_MESSAGE, ENGLISH_LANG_CODE, FRENCH_LANG_CODE, CODE_403, CODE_500, IP_PROVIDER_API_KEY, CLIENT_FOR_MOBILE_PAYMENT, API_MOBILE_MONEY_PAYMENT_INIT, SUCCESS, PUBLIC_KEY, STARS_FOR_NO_CONTENT, EMPTY_STRING, currencies
}
