const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'SET_NEW_INFORMATION':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default detailsReducer;