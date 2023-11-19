import React,{useEffect,useContext} from 'react'
import { ListGroup } from 'react-bootstrap';
import ExperienceTab from '../ExperienceTab/ExperienceTab';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import axios from "axios";


function LeftContainer() {
    const API_BASE_URL = 'https://travel-planner-467.wl.r.appspot.com';

    const {currentExperiences, updateExperiences} = useContext(ExperiencesContext);


    useEffect(() => {
        axios
        .get(`${API_BASE_URL}/experiences`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((res) => {updateExperiences(res.data.experiences);},[])
        .catch(e => console.log(e))

    });


    return ( 

        <ListGroup className='m-2 p-2'  style={{ height:"92%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
            {currentExperiences.map((experience, index) => {
                return (<ExperienceTab key={index} id={index} name={experience.experience_name} location={"Somewhere"} />)
            })}
      </ListGroup>
     );
}

export default LeftContainer;