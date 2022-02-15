const dimensionsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DIMENSIONS':
            return action.payload;
        default:
            return state;
    }
};

export default dimensionsReducer;