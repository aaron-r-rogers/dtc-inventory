const adminReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_USERS':
            return action.payload.users;
        default:
            return state;
    }
};

export default adminReducer;