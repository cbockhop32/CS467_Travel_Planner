import React, {useState, useContext} from 'react'
import { Container,Row, Col, Button,Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import MapboxComponent from '../MapboxComponent/MapboxComponent';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import axios from 'axios';
import { environment } from '../Environments/EnvDev';


function ExperienceDetails({id, name, location,description, address, city,country, latitude, longitude,rating, img_url}) {
    const {currentTrips} = useContext(ExperiencesContext);
    const [show, setShow] = useState(false);
    const [dropdownValue, setDropdownValue] = useState('Choose Trip');
    const [currSelectedID, setCurrSelectedID] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // console.log(currSelectedID)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    const handleAddExperienceToTrip = (trip_id) => {
        axios.post(`${environment.api_url}/trips/${trip_id}/add_experience`,
        {
            experience_id: id,
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

    return ( 
        <Container className='h-100 w-100'>
            <Row className='mb-1 text-start'>
                <Col lg={6} style={{fontSize:"28px"}}>
                    <Row>
                        {name}
                    </Row>
                    <Row style={{fontSize:"16px"}}>
                        {location}
                    </Row>    
                </Col>
                <Col className='mt-2 text-end'   lg={6}>
                    <Rating readonly={true} allowFraction={true} initialValue={rating} />
                    <Button onClick={handleShow} style={{marginLeft:"20px"}}>Add To Trip</Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Experience To One Of Your Trips</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <DropdownButton id="dropdown-basic-button" title={dropdownValue} onSelect={handleDropdownSelect}>
                                {currentTrips.map((trip,index) => {
                                    return (<Dropdown.Item key={index} onClick={()=> setCurrSelectedID(trip.self.substring(trip.self.lastIndexOf('/')+1))} id={trip.self.substring(trip.self.lastIndexOf('/')+1)} href="#/action-1" eventKey={trip.trip_name}>{trip.trip_name}</Dropdown.Item>)
                                })}
                            </DropdownButton>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={() => {handleAddExperienceToTrip(currSelectedID)}}>
                            Add
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
            <Row className='h-50 mb-2'>
                <Col lg={7} >
                    <ImageCarousel image_url={img_url}/>
                </Col>
                <Col id="mapbox" lg={5} >
                    <MapboxComponent lat={latitude} lon={longitude}></MapboxComponent>
                </Col>
            </Row>
            <hr></hr>

            <Row className='m-2' style={{display:"inline"}} >
                <b>Description:</b> {description}
            </Row>
            <Row className='m-2'>
                <Col>
                    <Row  style={{display:"inline"}}>
                        <b>Address: </b>{address + " " + city + ", " +country}
                    </Row>
                    <br></br>
                    <Row  style={{display:"inline"}}>
                        <b>Type of Activity: </b>Museum
                    </Row>
                </Col>
            </Row>
        </Container>
     );
}

export default ExperienceDetails;