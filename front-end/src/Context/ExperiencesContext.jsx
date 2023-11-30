import { createContext,useReducer } from "react";
import reducer from './experiencesReducer'


const initialState = {
    experiences : [],
    trips: [],
    token: ''
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

    function updateToken(token){
        dispatch({
            type:'UPDATE_TOKEN',
            payload: token
        })
    }

    return (
        <ExperiencesContext.Provider
            value={{
                currentExperiences: state.experiences,
                currentTrips: state.trips,
                token: state.token,
                updateExperiences, 
                updateTrips,
                updateToken
            }}
        >

            {children}
        </ExperiencesContext.Provider>
    )
}