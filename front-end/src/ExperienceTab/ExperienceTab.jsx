import React from 'react'
import { ListGroup,Col, Row , Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import '../Style/ExperienceTab.css';





function ExperienceTab({id,name,location}) {
    return (  
        <ListGroup.Item id ="Experience-Item" variant='primary' className='mt-2 rounded-3'action href={`#link${id}`}>
            <Row>
                <Col  sm={4} lg={4}>
                    <Image id="Expereince-Image" className='rounded-3' src='/pics/harbin.jpeg'/>
                </Col>
                <Col sm ={6} lg={6}> 
                    <Row>{name}</Row>
                    <Row>{location}</Row>
                </Col>
                <Col sm={2} lg={2}>
                    <Rating readonly={true} iconsCount={1} size={25} initialValue={1} />
                    <p>4.5</p>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default ExperienceTab;