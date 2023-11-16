import { createContext,useReducer } from "react";
import reducer from './experiencesReducer'


const initialState = {
    experiences : []
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

 

    return (
        <ExperiencesContext.Provider
            value={{
                currentExperiences: state.experiences,
                updateExperiences
            }}
        >

            {children}
        </ExperiencesContext.Provider>
    )
}