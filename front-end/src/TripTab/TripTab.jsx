import React from 'react'
import { ListGroup,Col, Row , Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'




function TripTab({id,name,location}) {
    return (  
        <ListGroup.Item style={{height:"75px"}}  variant='primary' className='mt-2 rounded-3'action href={`#link${id}`}>
            <Row>
                <Col  sm={4} lg={4}>
                    <Image className='rounded-3' style={{height:"60px"}} src='/pics/harbin.jpeg'/>
                </Col>
                <Col sm ={6} lg={6}> 
                    <Row>{name}</Row>
                    <Row>{location}</Row>
                </Col>
                <Col sm={2} lg={2}>
                  
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default TripTab;