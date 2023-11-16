import React, {useState} from 'react'
import { Container,Row, Col, Button,Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import MapboxComponent from '../MapboxComponent/MapboxComponent';


function ExperienceDetails({id, name, location,description}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



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
                    <Rating readonly={true} allowFraction={true} initialValue={4.5} />
                    <Button onClick={handleShow} style={{marginLeft:"20px"}}>Add To Trip</Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Experience To One Of Your Trips</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <DropdownButton id="dropdown-basic-button" title="Choose Trip">
                                <Dropdown.Item href="#/action-1">Trip 1</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Trip 2</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Trip 3</Dropdown.Item>
                            </DropdownButton>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Add
                        </Button>
                        </Modal.Footer>
                    </Modal>

                </Col>
            </Row>
            <Row className='h-50 mb-2'>
                <Col lg={7} >
                    <ImageCarousel/>
                </Col>
                <Col id="mapbox" lg={5} >
                    <MapboxComponent></MapboxComponent>
                </Col>
            </Row>
            <hr></hr>

            <Row className='m-2' style={{display:"inline"}} >
                <b>Description:</b> {description}
            </Row>
            <Row className='m-2'>
                <Col>
                    <Row  style={{display:"inline"}}>
                        <b>Address: </b>18 Marina Gardens Drive Singapore 018953
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