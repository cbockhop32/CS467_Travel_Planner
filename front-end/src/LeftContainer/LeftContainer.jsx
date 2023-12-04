import React,{useEffect,useContext, useState} from 'react'
import { ListGroup, Button,Modal, Dropdown, DropdownButton, Tab } from 'react-bootstrap';
import ExperienceTab from '../ExperienceTab/ExperienceTab';
import TripTab from '../TripTab/TripTab';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import { environment } from '../Environments/EnvDev';
import RightContainer from '../RightContainer/RightContainer';
import DashboardTripDetails from '../DashboardTripDetails/DashboardTripDetails';
import DashboardExperienceDetails from '../DashboardExperienceDetails/DashboardExperienceDetails';
import axios from "axios";


function LeftContainer({view}) {

    const {currentTrips,currentExperiences, updateExperiences} = useContext(ExperiencesContext);

    const [show, setShow] = useState(false);
    const [visibility, toggleVisibility] = useState(true);
    const [mobileDisplay, toggleMobile] = useState(false);

    const [dropdownValue, setDropdownValue] = useState('Choose Trip');
    const [currSelectedID, setCurrSelectedID] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    const handleAddExperienceToTrip = (trip_id, exp_id) => {
        axios.post(`${environment.api_url}/trips/${trip_id}/add_experience`,
        {
            experience_id: exp_id,
            public: true
        },
        {
            headers: headers
        })
        .then((res) => { 
            console.log(res);
        })
        .catch((e)=>console.log(e))

        handleClose();
    };

    const handleDropdownSelect = (e) => {
        // console.log(e);
        setDropdownValue(e);
    }

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
   
    const mediaMatch = () => {
        if (window.matchMedia("(max-width: 650px)").matches){
            toggleVisibility(false)
            toggleMobile(true);
        }
        else{
            toggleVisibility(true)
            toggleMobile(false);

        }
    }

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
            if(e.response.status === 401) {
                console.log("Login to be able to add Experience")
            }
            console.log(e)})

        // axios
        // .get(`${environment.api_url}/trips`,
        // {
        //     headers: headers
        // })
        // .then((res) => {updateTrips(res.data.trips);},[])
        // .catch(e => console.log(e))

        // grab token
        const currPath = window.location.pathname
        const tokenUrl = window.location.href.indexOf('token') // checking if there is token within the url path

        // Setting token within local storage
        if(currPath === '/dashboard' && tokenUrl > -1){
            const currUrl = window.location.href
            const userToken = currUrl.substring(currUrl.lastIndexOf('=')+1)
            // console.log(userToken)

            // const localStorageToken = localStorage.getItem('access_token')

            // if(localStorageToken === null) {
            //     localStorage.setItem('access_token', userToken);
            // }
                localStorage.setItem('access_token', userToken);

        }     
     
        //handles mobile screen resize
        mediaMatch()
        window.addEventListener('resize', mediaMatch, { capture: true });
    },[]);

    //mobile display
    if(view === "experiences" && mobileDisplay) {
        return (
                <ListGroup className='m-2 p-2'  style={{ height:"92%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
                    {currentExperiences.map((experience, exp_index) => {
                        return (
                        <>
                            <ExperienceTab
                                    key={exp_index}
                                    id={exp_index}
                                    name={experience.experience_name}
                                    city={experience.city}
                                    country={experience.country}
                                    rating={experience.rating}
                                    img_url={experience.image_url} 
                            />
                            <br/>

                            <div>
                                {"Description: " + experience.description}
                            </div>
                            <br/>

                            <div>
                                {"Address: " + experience.address}
                            </div>
                            <br/>

                            <div>
                                {"Type of Activity: " + experience.activity_type}
                            </div>
                            <br/>

                            <div>
                            <Button onClick={handleShow}>Add To Trip</Button>
                            <br/>

                            <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add Experience To One Of Your Trips</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DropdownButton id="dropdown-basic-button" title={dropdownValue} onSelect={handleDropdownSelect}>
                                    {currentTrips.map((trip,trip_index) => {
                                        return (
                                            <Dropdown.Item 
                                                    key={trip_index} 
                                                    onClick={()=> setCurrSelectedID(trip.self.substring(trip.self.lastIndexOf('/')+1))} 
                                                    id={trip.self.substring(trip.self.lastIndexOf('/')+1)} href="#/action-1" 
                                                    eventKey={trip.trip_name}>{trip.trip_name}
                                                </Dropdown.Item>)
                                    })}
                                </DropdownButton>

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" onClick={() => {handleAddExperienceToTrip(currSelectedID, exp_index)}}>
                                Add
                            </Button>
                            </Modal.Footer>
                            </Modal>
                            </div>
                            <br/>

                        </>                
                            )
                        })}
                </ListGroup>
        );
    }

    // Desktop experiences display
    else if(view === "experiences") {
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
        }

        // Mobile Trips Display
        else if(view === "trips" && mobileDisplay) {
            return ( 
                <Tab.Content className='m-2 p-2 rounded-3'  style={{ backgroundColor:"#d9d9d9", height:"92%",overflowY:"scroll"}}>
                    {currentTrips?.map((trip,index) => {
                        return (
                        <Tab.Pane key={index} eventKey={`#link${index}`}>
                                    <DashboardTripDetails  
                                        id = {trip.self.substring(trip.self.lastIndexOf('/')+1)} 
                                        name={trip.trip_name}  description={trip.description} 
                                        experiences={trip.experiences}/>
                </Tab.Pane>
                        )
                    })}
                </Tab.Content>
            );
        }


    // Desktop Trips display
     else if(view === "trips") {
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