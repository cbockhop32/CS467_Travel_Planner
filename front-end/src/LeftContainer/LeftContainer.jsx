import React,{useEffect,useContext} from 'react'
import { ListGroup } from 'react-bootstrap';
import ExperienceTab from '../ExperienceTab/ExperienceTab';
import { TripsContext } from '../Context/TripsContext';
import axios from "axios";


function LeftContainer() {
    const API_BASE_URL = 'https://travel-planner-467.wl.r.appspot.com';

    const {currentTrips, updateTrips} = useContext(TripsContext);


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

    });


    return ( 

        <ListGroup className='m-2 p-2'  style={{ height:"95%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
            {currentTrips.map((trip, index) => {
                return (<ExperienceTab key={index} id={index} name={trip.trip_name} location={"Somewhere"} />)
            })}
      </ListGroup>
     );
}

export default LeftContainer;