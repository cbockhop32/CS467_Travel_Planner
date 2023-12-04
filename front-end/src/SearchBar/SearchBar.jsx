import React, {useState, useContext} from 'react'
import {useLocation} from 'react-router-dom'
import {Form, Stack, Button, Row, Modal} from 'react-bootstrap';
import useInputState from '../hooks/useInputState';
import { Rating } from 'react-simple-star-rating'
import { ExperiencesContext } from '../Context/ExperiencesContext';
import { environment } from '../Environments/EnvDev';
import usaStates from '../Geolocation/usaStates';
import countryNames from '../Geolocation/countryCodes'
import axios from 'axios';
import '../SearchBar.css'


function SearchBar() {
    const [show, setShow] = useState(false);
    
    // use hook to handle state of city/state/country 
    // and lat and lon
    const [searchKeywords, updateSearchKeywords, resetSearchKeywords] = useInputState('');
    const [name, updateName, resetName] = useInputState('');
    const [address, updateAddress, resetAddress] = useInputState('');
    const [description, updateDescription, resetDescription] = useInputState('');
    const [city, updateCity, resetCity] = useInputState('');
    const [state, updateState, resetState] = useInputState('');
    const [country, updateCountry, resetCountry] = useInputState('');
    const [category, updateCategory] = useInputState('');
    const [rating, setRating] = useState(0)
    const [latitude, setLatitude] = useInputState(0);
    const [longitude, setLongitude] = useInputState(0);
    const [file, setFile] = useState(null); // for image input
    const [ error,setError] = useState(null) // for image input

    // Context for updating experiences
    const {updateExperiences} = useContext(ExperiencesContext);

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    let currRoute = useLocation();

    const resetFields = () => {
        resetName();
        resetAddress();
        resetDescription();
        resetCity();
        resetState();
        resetCountry();
        handleRatingReset();
    }


    const updateExperienceList = () => {
        axios
        .get(`${environment.api_url}/experiences`,
        {
            headers: headers
        })
        .then((res) => {updateExperiences(res.data.experiences);},[])
        .catch(e => {
            if(e.response.status === 401) {
                console.log("Login to be able to add Experience")
            }
            console.log(e)})
    }



    const handleSearch = (keywords) => {
        axios.get(`${environment.api_url}/experiences/search?keyword=${keywords}`)
        .then((res) => {
            updateExperiences(res.data);
        })
        .catch((e)=>console.log(e))
        
        // If the passed in keywords was empty, then the clear button was clicked
        if(keywords === '') {
            resetSearchKeywords();
        }
    }


    const handleAdd = async () => {
        setShow(false);


        // POST request to add the experience
        await axios.post(`${environment.api_url}/experiences`,
        {   
                experience_name: name,
                description: description,
                address: address,
                city: city,
                country: country,
                latitude: latitude,
                longitude: longitude,
                activity_type: category,
                rating: rating,
                public: true
        },
        {
            headers: headers
        })
        .then((res) => {
            // POSTING IMAGE ONCE EXPERIENCE IS ADDED
            console.log(res.data.id)
            handleImageRequest(res.data.id)

            // Need to update experience list
            updateExperienceList();
        })
        .catch((e)=>{
            if(e.response.status === 401) {
                alert("Please login or create an account inorder to add an Experience")
            }
            console.log(e)
        })

   
        // clear input fields
       resetFields();
    };


    // Functions for Rating functionality 

    const handleRating = (rate) => {
        setRating(rate)
    
        // other logic
      }

    const handleRatingReset = () => {
        // Set the initial value
        setRating(0)
      }

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        // clear input fields
        resetFields();
    }  


    const imageHandler = (e) => {
        let selected = e.target.files[0];

        console.log(selected)

        const types = ['image/png', 'image/jpeg'];
        
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }

    const image_headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    const handleImageRequest = (exp_id) => {
        const formData = new FormData()
        formData.append('file',file)

        // POST request to add the image
        axios.post(`${environment.api_url}/experiences/${exp_id}/image`,
        
           formData
        ,
        {
            headers:  image_headers
        })
        .then((res) => {console.log(res)})
        .catch((e)=>{
            console.log("error uploading image for new experience:" + e )
        })

    }

    if(currRoute.pathname === "/") {
        return ( 

            <Row className="justify-content-md-center mb-3" style={{height:"10%", maxHeight:"50px"}}>
                <Stack id="Search-Stack" className='m-2' direction="horizontal" gap={3}>
                    <Form.Control 
                        className="me-auto" 
                        placeholder='Enter Experience Name, Keywords, Location, etc.'
                        value={searchKeywords}
                        onChange={updateSearchKeywords}
                        />
                    <Button variant="primary" onClick={() => handleSearch(searchKeywords)} >Search</Button>
                    <Button variant="primary" onClick={() => handleSearch('')} >Clear</Button>
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
                                        </Form.Select>                              
                                    </Form.Group>   
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                       value={address}
                                       onChange={updateAddress}
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
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control  
                                    value={latitude}
                                    onChange={setLatitude} />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control  
                                    value={longitude}
                                    onChange={setLongitude} />
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Rating</Form.Label>
                                    <Rating
                                        onClick={handleRating}
                                        allowFraction={true}
                                        style={{marginLeft: "10px"}}
                                    />
                     
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
                                    <Form.Control type="file" onChange={imageHandler} size="sm" />
              
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={async ()=> {await handleAdd();}}>
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