const materialsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MATERIALS':
            return action.payload[0].materials;
        default:
            return state;
    }
};

export default materialsReducer;