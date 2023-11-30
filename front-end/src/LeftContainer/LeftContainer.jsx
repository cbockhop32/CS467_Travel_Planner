import React,{useEffect,useContext, useState} from 'react'
import { ListGroup } from 'react-bootstrap';
import ExperienceTab from '../ExperienceTab/ExperienceTab';
import TripTab from '../TripTab/TripTab';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import { environment } from '../Environments/EnvDev';
import axios from "axios";


function LeftContainer({view}) {

    const {token,currentTrips,currentExperiences, updateExperiences,updateToken, updateTrips} = useContext(ExperiencesContext);

    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    // }

    

    // const updateTripsList = () => {
    //     axios
    //     .get(`${environment.api_url}/trips`,
    //     {
    //         headers: headers
    //     })
    //     .then((res) => {updateTrips(res.data.trips);},[])
    //     .catch(e => console.log(e))
    // }
   

    useEffect(() => {

        // updateTripsList();



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

        // grab token
        const currPath = window.location.pathname
        const tokenUrl = window.location.href.indexOf('token') // checking if there is token within the url path

        // Setting token within local storage
        if(currPath === '/dashboard' && tokenUrl > -1){
            const currUrl = window.location.href
            const userToken = currUrl.substring(currUrl.lastIndexOf('=')+1)
            // console.log(userToken)

            const localStorageToken = localStorage.getItem('access_token')

            // if(localStorageToken === null) {
            //     localStorage.setItem('access_token', userToken);
            // }
                localStorage.setItem('access_token', userToken);

        }     
     
    },[]);



    if(view == "experiences") {
        return (
                <ListGroup className='m-2 p-2'  style={{ height:"92%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
                    {currentExperiences.map((experience, index) => {
                        return (<ExperienceTab 
                            key={index} 
                            id={index} 
                            name={experience.experience_name} 
                            city={experience.city} 
                            country={experience.country} 
                            rating={experience.rating}
                            img_url={experience.image_url}
                            />)
                        })}
                </ListGroup>
        );


    } else if(view == "trips") {
        return(
        <ListGroup className='m-2 p-2'  style={{ height:"92%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
        {currentTrips.map((trip, index) => {
            return (<TripTab key={index} id={index} name={trip.trip_name}  />)
            })}
            </ListGroup>
        );
    }
       
    
}

export default LeftContainer;