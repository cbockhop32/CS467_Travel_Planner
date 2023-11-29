import React from 'react'
import { ListGroup,Col, Row , Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'




function TripTab({id,name}) {
    return (  
        <ListGroup.Item style={{height:"75px"}}  variant='primary' className='mt-2 rounded-3'action href={`#link${id}`}>
            <Row>
                <Col  sm={1} lg={1}>
                </Col>
                <Col sm ={6} lg={6}> 
                    <Row>{name}</Row>
                </Col>
                <Col sm={5} lg={5}>
                  
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default TripTab;