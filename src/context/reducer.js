import {EDIT_FORM_VALUES, CHANGE_MODAL_STATES, FORM_EMPTY_VALUES} from "../constants/variableNames";

const initialState = {
    formValues: {
        receiver:"",
        name: "",
        email: "",
        phone: "",
        currency: "",
        amount: "1",
        received:"",
        paymentMethod:"",
        receiverName:"",
        payerId:"",
        receiverEmail:"",
        transactionReference:"",
        paymentIntent:"",
        rate:"1",
        ip:'',
        card:null,
        receiverLogo:"",
        fees:4,
        callbackUrl:"",
        senderExist:false

    },
    modalStates:{
        showsuccessmodal:false,
        showfailmodal:false,
        showpendingmodal:false,
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
