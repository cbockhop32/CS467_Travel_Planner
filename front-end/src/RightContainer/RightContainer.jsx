import React,{useContext,useEffect} from 'react'
import { Tab } from 'react-bootstrap';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';
import DashboardTripDetails from '../DashboardTripDetails/DashboardTripDetails';
import DashboardExperienceDetails from '../DashboardExperienceDetails/DashboardExperienceDetails';
import { environment } from '../Environments/EnvDev';
import axios from 'axios';


function RightContainer({view, dashboardView}) {
    const {currentExperiences,updateTrips} = useContext(ExperiencesContext);
    const {currentTrips} = useContext(ExperiencesContext);


    useEffect(() => {
        axios
        .get(`${environment.api_url}/trips`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((res) => {updateTrips(res.data.trips);},[])
        .catch(e => console.log(e))

    },[]);

    if(view === "experiences" && dashboardView === false) {
        return (  
            <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"92%",overflowY:"scroll"}}>
                {currentExperiences.map((experience,index) => {
                    return (<Tab.Pane key={index} eventKey={`#link${index}`}><ExperienceDetails  id = {experience.self.substring(experience.self.lastIndexOf('/')+1)} name={experience.experience_name} location={"Somewhere"} description={experience.description}/></Tab.Pane>
                    )
                })}
            </Tab.Content>
        );


    } else if (view === "experiences" && dashboardView === true) {
        return (  
            <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"92%",overflowY:"scroll"}}>
                {currentExperiences.map((experience,index) => {
                    return (<Tab.Pane key={index} eventKey={`#link${index}`}><DashboardExperienceDetails  
                        id = {experience.self.substring(experience.self.lastIndexOf('/')+1)} 
                        name={experience.experience_name}
                        description={experience.description}
                        address={experience.address} 
                        city={experience.city}
                        country={experience.country}
                        latitude={experience.latitude}
                        longitude={experience.longitude}
                        activity_type={experience.activity_type}
                        rating={experience.rating}
                        />
                    </Tab.Pane>
                    )
                })}
            </Tab.Content>
        );
     

    } else if (view === "trips") {
        return (  
            <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"92%",overflowY:"scroll"}}>
                {currentTrips.map((trip,index) => {
                    return (<Tab.Pane key={index} eventKey={`#link${index}`}><DashboardTripDetails  id = {trip.self.substring(trip.self.lastIndexOf('/')+1)} name={trip.trip_name}  description={trip.description}/></Tab.Pane>
                    )
                })}
            </Tab.Content>
        );

    } 

  
}

export default RightContainer;