import {EDIT_FORM_VALUES, CHANGE_MODAL_STATES, FORM_EMPTY_VALUES} from "../constants/variableNames";

const initialState = {
    formValues: {
        sendermobilenumber:"",
        name: "James Heller",
        email: "jamesh@gmail.com",
        phone: "09909022",
        currency: "USD",
        amount: "1",
        received:"",
        paymentMethod:"",
        receiverName:"Olivier Pierre",
        clientName:"Orvid Corporate",
        paymentRequestId:"",
        receiverEmail:"",
        transactionReference:"",
        paymentIntent:"",
        rate:"",
        ip:'',
        card:null,
        receiverLogo:"",
        fees:4,
        callBackUrl:"",
        error:false,
        code:"",
        clientCurrency:"USD",
        clientKey:""

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
