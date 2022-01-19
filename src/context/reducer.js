import {EDIT_FORM_VALUES, CHANGE_MODAL_STATES, FORM_EMPTY_VALUES} from "../constants/variableNames";

const initialState = {
    formValues: {
        receiver:"Lisa",
        name: "James Pitchell",
        email: "",
        phone: "",
        currency: "GBP",
        amount: "100",
        received:"1000",
        paymentMethod:"",
        receiverName:"Naomie Jacson",
        clientName:"Next-Corporate",
        paymentRequestId:"",
        receiverEmail:"",
        transactionReference:"KJH-18T6Y7",
        paymentIntent:"",
        rate:"",
        ip:'',
        card:null,
        receiverLogo:"",
        fees:4,
        callBackUrl:"",
        error:false,
        code:"",
        clientCurrency:"",

    },
    modalStates:{
        showsuccessmodal:false,
        showfailmodal:false,
        showpendingmodal:false,
        showaccessdeniedmodal:false
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case EDIT_FORM_VALUES:
            state.formValues[action.key.toLowerCase()] = action.value;
            return { ...state };

        case FORM_EMPTY_VALUES:
            return {
                ...state,
                formValues: initialState.formValues
            };
        case CHANGE_MODAL_STATES:
            state.modalStates[action.key.toLowerCase()] = action.value
            return {...state}
        default:
    }
    return state;
};

export { initialState, reducer }
