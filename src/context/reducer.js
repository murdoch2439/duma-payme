const initialState = {
    formValues: {
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
        rate:"",
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
    };
    return state;
};

export { initialState, reducer }