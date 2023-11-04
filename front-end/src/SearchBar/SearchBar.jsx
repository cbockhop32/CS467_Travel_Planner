import React, {useState} from 'react'
import {Form, Stack, Button, Row, Modal} from 'react-bootstrap';


function SearchBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return ( 

        <Row className="justify-content-md-center mb-3 ">
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
                                <Form.Control  />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Location</Form.Label>
                                <Form.Control  />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Geo-Location (Lat,Lon)</Form.Label>
                                <Form.Control  />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3}  />
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
                    <Button variant="primary" onClick={handleClose}>
                        Add
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Stack>
        </Row>

        
        );
}

export default SearchBar;