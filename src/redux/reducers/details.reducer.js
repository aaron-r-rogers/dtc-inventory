const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'SET_NEW_DESIGNER':
            return {...state, ...action.payload};
        case 'SET_NEW_MATERIAL':
            return {...state, ...action.payload};
            case 'SET_NEW_CATEGORY':
                return {...state, ...action.payload};
        default:
            return state;
    }
};

export default detailsReducer;