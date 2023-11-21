import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
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
    const [city, updateCity, resetCity] = useInputState('');
    const [state, updateState, resetState] = useInputState('');
    const [country, updateCountry, resetCountry] = useInputState('');
    const [category, updateCategory] = useInputState('');


    const [lattitude, setLat] = useState('');
    const [longitude, setLon] = useState('');
    const API_BASE_URL = 'https://travel-planner-467.wl.r.appspot.com';

    let currRoute = useLocation();


    const resetFields = () => {
        resetName();
        resetLocation();
        resetDescription();
        resetCity();
        resetState();
        resetCountry();

    }
    
    const handleAdd = () => {
        setShow(false);
        // pass the lat and lon once parameters are made in the back end
        geoLocation(city, state, country, setLat, setLon);

        axios.post(`${API_BASE_URL}/experiences`,
        {
            experience_name: name,
            description: description

        })
        .then((res) => {console.log(res)})
        .catch((e)=>console.log(e))

        // clear input fields
       resetFields();
    };


    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        // clear input fields
        resetFields();
    }  
 
    // Can un-comment this to see React state change in console
    // useEffect(() => 
    // console.log("city:", city),
    // console.log("state:", state),
    // console.log("country:", country),
    // console.log("country:", country),
    // console.log("lattitude:", lattitude),
    // console.log("longitude:", longitude),
    // [city, state, country, lattitude, longitude]);
    if(currRoute.pathname == "/") {
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
                                <Form.Group className='mb-3'>
                                    <Form.Label>Type of Activity</Form.Label>
                                    <Form.Select
                                     value={category}
                                     onChange={updateCategory}>
                                    <option>Select a Category</option>
                                    <option>Food/Drink</option>
                                    <option>Museum</option>
                                    <option>Music</option>
                                    <option>Park</option>
                                    <option>Shopping</option>
                                    <option>Sports</option>
                                    <option>Tour</option>
                                    <option>Other</option>
                                    </Form.Select>                              </Form.Group>   
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
                                    onChange={updateCity}/>
                                </Form.Group>                            
                                    <Form.Group className='mb-3'>
                                    <Form.Label>State (US States Only)</Form.Label>
                                    <Form.Control 
                                    value={state} 
                                    onChange={updateState}/>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control  
                                    value={country}
                                    onChange={updateCountry} />
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
    } else {
        return ( <></>



        )
    }
    
}

export default SearchBar;