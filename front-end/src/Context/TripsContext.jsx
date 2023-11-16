import { createContext,useReducer } from "react";
import reducer from './tripsReducer';


const initialState = {
    trips : []
}


export const TripsContext = createContext(initialState);


export const TripsProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

  
    // Update Trips

    function updateTrips(trips) {
        dispatch({
            type:'UPDATE_TRIPS',
            payload: trips
        })
    }

 

    return (
        <TripsContext.Provider
            value={{
                currentTrips: state.trips,
                updateTrips
            }}
        >

            {children}
        </TripsContext.Provider>
    )
}