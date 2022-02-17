const adminReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_USERS':
            return action.payload.data;
        default:
            return state;
    }
};

export default adminReducer;