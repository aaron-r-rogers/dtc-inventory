const listReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST':
            console.log('setting list, action.payload[0]:', action.payload[0]);
            return action.payload;
        default:
            return state;
    }
};

export default listReducer;