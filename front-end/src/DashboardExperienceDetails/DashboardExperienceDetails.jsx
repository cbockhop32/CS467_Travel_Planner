import React,{useState, useContext} from 'react'
import { Container,Row, Col, Button,Form, Modal} from 'react-bootstrap';
import useInputState from '../hooks/useInputState';
import { Rating } from 'react-simple-star-rating'
import { environment } from '../Environments/EnvDev';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import axios from 'axios';




function DashboardExperienceDetails({id,name,description,address,city,country,latitude,longitude,activity_type,rating}) {
    const [editing,setEditing] = useState(false);
    const [expName, updateExpName] = useInputState(name);
    const [expAddress, updateExpAddress] = useInputState(address);
    const [expType, updateExpType] = useInputState(activity_type);
    const [expCity, updateExpCity] = useInputState(city);
    const [expState, updateExpState] = useInputState('');
    const [expCountry, updateExpCountry] = useInputState(country);
    const [expLat, updateExpLat] = useInputState(latitude);
    const [expLon, updateExpLon] = useInputState(longitude);
    const [expDescription, updateExpDescription] = useInputState(description);
    const [expRating, setExpRating] = useState(rating)

    
    const [show, setShow] = useState(false); // for the delete confirmation modal
    const {updateExperiences} = useContext(ExperiencesContext);


   const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    const handleEdit = () => {
        setEditing(!editing);
    }

    const handleUpdate = (exp_id) => {
        axios.put(`${environment.api_url}/experiences/${exp_id}`,
        {
            experience_name: expName,
            description: expDescription,
            address: expAddress,
            city: expCity,
            country: expCountry,
            latitude: expLat,
            longitude: expLon,
            activity_type: expType,
            rating: expRating,
            public: true
        },
        {
            headers: headers
        })
        .then((res) => {console.log(res)})
        .catch((e)=>console.log(e))

        handleEdit();

    }
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }  

    const updateExperienceList = () => {
        axios
        .get(`${environment.api_url}/experiences`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        })
        .then((res) => {updateExperiences(res.data.experiences);},[])
        .catch(e => console.log(e))
    }

    const handleDelete = (exp_id) => {
        axios.delete(`${environment.api_url}/experiences/${exp_id}`,
        {
            headers:headers
        }
        )
        .then((res) => { 
            console.log(res);
            updateExperienceList();
        })
        .catch((e)=>console.log(e))

        handleClose();
    };

    const handleRating = (rate) => {
        setExpRating(rate)
    
        // other logic
      }


    return ( 
        <Container className='h-100 w-100'>
            <Row className='mb-1 text-start'>
                <Col lg={6} >
                    <Form.Group as={Row} controlId="address">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  value={expName} disabled={!editing} onChange={updateExpName} />
                    </Form.Group>
               
                </Col>
                <Col className='mt-2 text-end'   lg={6}>
                    <Rating readonly={editing ? false : true} allowFraction={true} initialValue={expRating} onClick={handleRating} />
                    {editing ? (<Button onClick={() => {handleUpdate(id)}}   style={{marginLeft:"20px"}}>Save Experience</Button>):
                    <Button onClick={handleEdit}   style={{marginLeft:"20px"}}>Edit Experience</Button>}
                    <Button variant='danger' disabled={editing ? true : false} onClick={handleShow} style={{marginTop:"20px"}}>Delete Experience</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you want to delete {name}?</p>
                           
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {handleDelete(id)}} >
                            Delete
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <hr></hr>

            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control  placeholder="Enter Address" value={expAddress} onChange={updateExpAddress} disabled={!editing}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="type">
                        <Form.Label>Activity Type</Form.Label>
                        <Form.Control  disabled={!editing} value={expType} onChange={updateExpType}/>
                    </Form.Group>


                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control disabled={!editing} value={expCity} onChange={updateExpCity} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control disabled={!editing} value={expState} onChange={updateExpState} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Country</Form.Label>
                        <Form.Control disabled={!editing} value={expCountry} onChange={updateExpCountry}/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={expDescription}
                            style={{ height: '100px' }}
                            disabled={!editing}
                            onChange={updateExpDescription}
                            />
                    </Form.Group>

                </Row>


            </Form>
        </Container>

     );
}

export default DashboardExperienceDetails;