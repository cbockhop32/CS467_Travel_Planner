import { createContext,useReducer } from "react";
import reducer from './experiencesReducer'


const initialState = {
    experiences : [],
    trips: []
}

export const ExperiencesContext = createContext(initialState);

export const ExperiencesProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Update Experiences
    function updateExperiences(experiences) {
        dispatch({
            type:'UPDATE_EXPERIENCES',
            payload: experiences
        })
    }

    function updateTrips(trips) {
        dispatch({
            type:'UPDATE_TRIPS',
            payload: trips
        })
    }

    return (
        <ExperiencesContext.Provider
            value={{
                currentExperiences: state.experiences,
                currentTrips: state.trips,
                updateExperiences, 
                updateTrips
            }}
        >

            {children}
        </ExperiencesContext.Provider>
    )
}