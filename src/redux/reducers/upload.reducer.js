const uploadReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_PATH':
            return action.payload;
        default:
            return state;
    }
};

export default uploadReducer;