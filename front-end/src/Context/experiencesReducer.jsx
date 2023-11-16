export default(state, action) => {
    switch(action.type) {
        case 'UPDATE_EXPERIENCES':
            return {
                experiences: action.payload
            }


            default: 
             return state;
    }
}