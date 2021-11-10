const initialState = {
    formValues: {
        receiver:"",
        name: "",
        email: "",
        phone: "",
        currency: "USD",
        amount: "1",
        received:"",
        paymentMethod:"",
        receiverName:"James Heller",
        payerId:"",
        receiverEmail:"",
        transactionReference:"",
        paymentIntent:"",
        rate:"1",
        ip:'',
        card:null,
        receiverLogo:"",
        fees:4,

    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'editFormValue':
            state.formValues[action.key.toLowerCase()] = action.value;
            return { ...state };

        case 'emptyFormValue':
            return {
                ...state,
                formValues: initialState.formValues
            };
        default:
    }
    return state;
};

export { initialState, reducer }
