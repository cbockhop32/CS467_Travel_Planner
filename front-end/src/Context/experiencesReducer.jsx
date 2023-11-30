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

        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.payload
            }
    
        default: 
            return state;
    }
}