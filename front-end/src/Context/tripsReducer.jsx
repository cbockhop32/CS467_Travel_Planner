export default(state, action) => {
    switch(action.type) {
        case 'UPDATE_TRIPS':
            return {
                trips: action.payload
            }


            default: 
             return state;
                
            
    }
}