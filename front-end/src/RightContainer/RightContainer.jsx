import React,{useContext} from 'react'
import { Tab } from 'react-bootstrap';
import { ExperiencesContext } from '../Context/ExperiencesContext';

import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';



function RightContainer() {
    const {currentExperiences} = useContext(ExperiencesContext);

    return (  
        <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"95%",overflowY:"scroll"}}>
            {currentExperiences.map((experience,index) => {
                return (<Tab.Pane key={index} eventKey={`#link${index}`}><ExperienceDetails  id = {index} name={experience.experience_name} location={"Somewhere"} description={experience.description}/></Tab.Pane>
                )
            })}
      </Tab.Content>
    );
}

export default RightContainer;