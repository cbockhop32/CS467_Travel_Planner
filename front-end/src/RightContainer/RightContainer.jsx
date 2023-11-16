import React,{useContext} from 'react'
import { Tab } from 'react-bootstrap';
import { TripsContext } from '../Context/TripsContext';

import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';



function RightContainer() {
    const {currentTrips} = useContext(TripsContext);

    return (  
        <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"95%",overflowY:"scroll"}}>
            {currentTrips.map((trip,index) => {
                return (<Tab.Pane eventKey={`#link${index}`}><ExperienceDetails id = {index} name={trip.trip_name} location={"Somewhere"} description={trip.description}/></Tab.Pane>
                )
            })}
      </Tab.Content>
    );
}

export default RightContainer;