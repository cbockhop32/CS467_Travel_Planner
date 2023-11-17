export default(state, action) => {
    switch(action.type) {
        case 'UPDATE_EXPERIENCES':
            return {
                ...state,
                experiences: action.payload
            }

        case 'UPDATE_TRIPS':
                return {
                    ...state,
                    trips: action.payload
                }
    
        default: 
            return state;
    }
}