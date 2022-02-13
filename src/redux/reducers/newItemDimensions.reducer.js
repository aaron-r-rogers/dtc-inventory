const newItemDimensionsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'STORE_DIMENSIONS':
            return action.payload;
        default:
            return state;
    }
};

export default newItemDimensionsReducer;