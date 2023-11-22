import React, {useContext, useState} from 'react'
import { Container,Row, Col, Button,Form, Accordion } from 'react-bootstrap';
import { ExperiencesContext } from '../Context/ExperiencesContext';





function DashboardTripDetails({id,name,location,description}) {
    const [editing,setEditing] = useState(false);
    const [tripName,updateTripName] = useState(name);
    const [tripDescription,updateTripDescription] = useState(description);



    const handleEdit = () => {
        setEditing(!editing);
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
                    {editing ? (<Button onClick={handleEdit}   style={{marginLeft:"20px"}}>Save Trip</Button>):
                    <Button onClick={handleEdit}   style={{marginLeft:"20px"}}>Edit Trip</Button>}
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
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Experience #1</Accordion.Header>
                        <Accordion.Body>
                            <Row className='mb-2'>
                                <Col>
                                Experience Name
                                </Col>
                                <Col>
                                Experience Location
                                </Col>
                               
                            </Row>
                            <Row >
                                <Col>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                                
                                </Col>
                        

                            </Row>
                  
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Experience #2</Accordion.Header>
                        <Accordion.Body>
                        <Row className='mb-2'>
                                <Col>
                                Experience Name
                                </Col>
                                <Col>
                                Experience Location
                                </Col>
                               
                            </Row>
                            <Row >
                                <Col>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                                
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Experience #3</Accordion.Header>
                        <Accordion.Body>
                        <Row className='mb-2'>
                                <Col>
                                Experience Name
                                </Col>
                                <Col>
                                Experience Location
                                </Col>
                               
                            </Row>
                            <Row >
                                <Col>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                                
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Row>
   
        </Container>
     );
}

export default DashboardTripDetails;