import React, {useState} from 'react'
import { Container,Row, Col, Button,Modal, Dropdown,DropdownButton } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import MapboxComponent from '../MapboxComponent/MapboxComponent';


function ExperienceDetails({id, name, location}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return ( 
        <Container style={{height:"80vh"}} >
            <Row className='mb-1'  >
                <Col lg={7} style={{fontSize:"28px"}}>
                    <Row>
                        {name}
                    </Row>
                    <Row style={{fontSize:"16px"}}>
                        {location}
                    </Row>    
                </Col>
                <Col className='mt-2 '  lg={5}>
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
            <Row className='m-2' style={{display:"inline"}} >
            <b>Description:</b> A national garden and premier horticultural attraction for local and international visitors, Gardens by the Bay is a showpiece of horticulture and garden artistry that presents the plant kingdom in a whole new way, entertaining while educating visitors with plants seldom seen in this part of the world, ranging from species in cool, temperate climates to tropical forests and habitats.
            </Row>
            <Row className='m-2'>
                <Col>
                    <Row className='mt-2' style={{display:"inline"}}>
                        <b>Address: </b>18 Marina Gardens Drive Singapore 018953
                    </Row>
                    <br></br>
                    <Row className='mt-2' style={{display:"inline"}}>
                        <b>Type of Activity: </b>Museum
                    </Row>
                </Col>
            </Row>
        </Container>
     );
}

export default ExperienceDetails;