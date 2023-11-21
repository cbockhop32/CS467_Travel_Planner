import React,{useContext,useEffect} from 'react'
import { Tab } from 'react-bootstrap';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';
import TripDetails from '../TripDetails/TripDetails';
import axios from 'axios';


function RightContainer({view}) {
    const {currentExperiences,updateTrips} = useContext(ExperiencesContext);
    const {currentTrips} = useContext(ExperiencesContext);


    const API_BASE_URL = 'https://travel-planner-467.wl.r.appspot.com';

    useEffect(() => {
        axios
        .get(`${API_BASE_URL}/trips`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((res) => {updateTrips(res.data.trips);},[])
        .catch(e => console.log(e))

    },[]);

    if(view == "experiences") {
        return (  
            <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"92%",overflowY:"scroll"}}>
                {currentExperiences.map((experience,index) => {
                    return (<Tab.Pane key={index} eventKey={`#link${index}`}><ExperienceDetails  id = {index} name={experience.experience_name} location={"Somewhere"} description={experience.description}/></Tab.Pane>
                    )
                })}
            </Tab.Content>
        );


    } else if (view == "trips") {
        return (  
            <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"92%",overflowY:"scroll"}}>
                {currentTrips.map((trip,index) => {
                    return (<Tab.Pane key={index} eventKey={`#link${index}`}><TripDetails  id = {index} name={trip.trip_name} location={"Somewhere"} description={trip.description}/></Tab.Pane>
                    )
                })}
            </Tab.Content>
        );


    }

  
}

export default RightContainer;