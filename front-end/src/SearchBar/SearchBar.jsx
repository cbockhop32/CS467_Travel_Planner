import React, {useState} from 'react'
import {Form, Stack, Button, Row, Modal} from 'react-bootstrap';
import geoLocation from '../Geolocation/geolocationAPI';
import useInputState from '../hooks/useInputState';
import axios from 'axios';

function SearchBar() {
    const [show, setShow] = useState(false);
    
    // use hook to handle state of city/state/country 
    // and lat and lon
    const [name, updateName, resetName] = useInputState('');
    const [location, updateLocation, resetLocation] = useInputState('');
    const [description, updateDescription, resetDescription] = useInputState('');

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lattitude, setLat] = useState('');
    const [longitude, setLon] = useState('');
    const API_BASE_URL = 'https://travel-planner-467.wl.r.appspot.com';



    
    const handleAdd = () => {

        setShow(false);
        // pass the lat and lon once parameters are made in the back end
        // geoLocation(city, state, country, setLat, setLon);


        axios.post(`${API_BASE_URL}/trips`,
        {
            trip_name: name,
            description: description

        })
        .then((res) => {console.log(res)})
        .catch((e)=>console.log(e))

        // clear input fields
        resetName();
        resetLocation();
        resetDescription();


    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    // react hook on change handlers
    const onCityChange = (e) => {
        setCity(e.target.value)
    };

    const onStateChange = (e) => {
        setState(e.target.value)
    };

    const onCountryChange = (e) => {
        setCountry(e.target.value)
    };

    // Can un-comment this to see React state change in console
    // useEffect(() => 
    // console.log("city:", city),
    // console.log("state:", state),
    // console.log("country:", country),
    // console.log("country:", country),
    // console.log("lattitude:", lattitude),
    // console.log("longitude:", longitude),
    // [city, state, country, lattitude, longitude]);

    return ( 

        <Row className="justify-content-md-center mb-3" style={{height:"10%", maxHeight:"50px"}}>
            <Stack className='m-2' direction="horizontal" gap={3} style={{width:"50%"}}>
                <Form.Control className="me-auto" placeholder='Enter Experience Name, Keywords, Location, etc.' />
                <Button variant="primary" >Search</Button>
                <div className="vr" />
                <Button variant="primary"  onClick={handleShow}>Add</Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add An Experience</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Name of Experience</Form.Label>
                                <Form.Control 
                                    value={name}
                                    onChange={updateName}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control 
                                   value={location}
                                   onChange={updateLocation}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>City</Form.Label>
                                <Form.Control  
                                value={city} 
                                onChange={onCityChange}/>
                            </Form.Group>                            
                                <Form.Group className='mb-3'>
                                <Form.Label>State (US States Only)</Form.Label>
                                <Form.Control 
                                value={state} 
                                onChange={onStateChange}/>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Country</Form.Label>
                                <Form.Control  
                                value={country}
                                onChange={onCountryChange} />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} 
                                       value={description}
                                       onChange={updateDescription}
                                />
                            </Form.Group>
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <Form.Label>Add Images</Form.Label>
                                <Form.Control type="file" size="sm" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Add
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Stack>
        </Row>

        
        );
}

export default SearchBar;