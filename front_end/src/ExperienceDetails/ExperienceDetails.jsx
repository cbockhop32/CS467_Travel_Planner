import React, { memo } from 'react'
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import MapboxComponent from '../MapboxComponent/MapboxComponent';


function ExperienceDetails({id}) {
    return ( 
        <Container style={{height:"80vh"}} >
            <Row className='mb-1'  >
                <Col lg={7} style={{fontSize:"28px"}}>Experience Name {id}</Col>
                <Col lg={5}>
                    <Rating readonly={true} allowFraction={true} initialValue={4.5} />
                </Col>
                </Row>
            <Row className='h-50 mb-2'>
                <Col lg={7} style={{border:"1px black solid"}}>
                    <ImageCarousel/>
                </Col>
                <Col id="mapbox" lg={5} style={{border:"1px black solid"}}>
                    <MapboxComponent></MapboxComponent>
                </Col>
            </Row>
            <Row style={{border:"1px black solid"}}>
                Description: 
            </Row>
        </Container>
     );
}

export default ExperienceDetails;