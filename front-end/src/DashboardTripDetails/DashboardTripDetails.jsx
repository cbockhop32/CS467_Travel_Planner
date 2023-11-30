import React, {useContext, useState} from 'react'
import { Container,Row, Col, Button,Form, Accordion, Modal } from 'react-bootstrap';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import DashboardExperienceAccordion from '../DashboardExperienceAccordion/DashboardExperienceAccordion';
import { environment } from '../Environments/EnvDev';
import useInputState from '../hooks/useInputState';

import axios from 'axios';





function DashboardTripDetails({id,name,description,experiences}) {
    const [editing,setEditing] = useState(false);
    const [tripName,updateTripName] = useInputState(name)
    const [tripDescription,updateTripDescription] = useInputState(description)
    const [show, setShow] = useState(false); // for the delete confirmation modal
    const {currentExperiences,updateTrips} = useContext(ExperiencesContext);

    console.log(experiences)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    const handleEdit = () => {
        setEditing(!editing);
    }
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
    }  

    const updateTripsList = () => {
        axios
        .get(`${environment.api_url}/trips`,
        {
            headers: headers
        })
        .then((res) => {updateTrips(res.data.trips);},[])
        .catch(e => console.log(e))
    }

    const handleDelete = (id) => {
        axios.delete(`${environment.api_url}/trips/${id}`,
        {
            headers: headers
        }
        )
        .then((res) => {
            console.log(res);
            updateTripsList();
        })
        .catch((e)=>console.log(e))


        handleClose();
    };


    const handleUpdate = (id) => {
        axios.put(`${environment.api_url}/trips/${id}`,
        {
            trip_name: tripName,
            description: tripDescription
        },
        {
            headers:headers
        })
        .then((res) => {
            console.log(res);
            // updateTripsList();
        })
        .catch((e) => console.log(e))

        handleEdit();

    }

    return ( 

        <Container className='h-100 w-100'>
            <Row className='m-2 text-start'>
                <Col lg={6} >
                    <Form.Group as={Row} controlId="address">
                        <Form.Label>Trip Name</Form.Label>
                        <Form.Control  value={tripName} disabled={!editing} onChange={updateTripName} />
                    </Form.Group>
              
                </Col>

                <Col className='mt-2 text-end'   lg={6}>
                    {editing ? (<Button onClick={()=> handleUpdate(id)}   style={{marginLeft:"20px"}}>Save Trip</Button>):
                    <Button onClick={handleEdit}   style={{marginLeft:"20px"}}>Edit Trip</Button>}
                    <Button variant='danger' disabled={editing ? true : false} onClick={handleShow}   style={{marginLeft:"20px"}}>Delete Trip</Button>
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
            <Row className='m-2' style={{display:"inline"}} >
                <Form.Group as={Col} controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={tripDescription}
                        style={{ height: '100px' }}
                        disabled={!editing}
                        onChange={updateTripDescription}
                        />
                </Form.Group>
            </Row>

            <hr></hr>
            <Row>
                <Col className='mb-2'>
                Experiences Added to Trip
                </Col>
                <Accordion>
                    {currentExperiences
                        .filter((exp) => experiences.includes(exp.self.substring(exp.self.lastIndexOf('/')+1) ) )
                        .map((filteredExp,index) => {
                            return(<DashboardExperienceAccordion eventKey={index} name ={filteredExp.experience_name} location={filteredExp.city + ", " + filteredExp.country } description={filteredExp.description} />)
                        })
                    }
                </Accordion>
            </Row>
   
        </Container>
     );
}

export default DashboardTripDetails;