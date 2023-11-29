import React,{useEffect,useContext, useState} from 'react'
import { ListGroup } from 'react-bootstrap';
import ExperienceTab from '../ExperienceTab/ExperienceTab';
import TripTab from '../TripTab/TripTab';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import { environment } from '../Environments/EnvDev';
import axios from "axios";


function LeftContainer({view}) {

    const {currentTrips,currentExperiences, updateExperiences} = useContext(ExperiencesContext);

    const [token, setToken_] = useState(localStorage.getItem("token"));


    useEffect(() => {
            axios
            .get(`${environment.api_url}/experiences`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
            .then((res) => {updateExperiences(res.data.experiences);},[])
            .catch(e => {
                if(e.response.status == 401) {
                    console.log("Login to be able to add Experience")
                }
                console.log(e)})


            console.log(token)
                
        
    },[]);



    if(view == "experiences") {
        return (
                <ListGroup className='m-2 p-2'  style={{ height:"92%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
                    {currentExperiences.map((experience, index) => {
                        return (<ExperienceTab key={index} id={index} name={experience.experience_name} location={"Somewhere"} />)
                        })}
                </ListGroup>
        );


    } else if(view == "trips") {
        return(
        <ListGroup className='m-2 p-2'  style={{ height:"92%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
        {currentTrips.map((trip, index) => {
            return (<TripTab key={index} id={index} name={trip.trip_name} location={"Somewhere"} />)
            })}
            </ListGroup>
        );
    }
       
    
}

export default LeftContainer;