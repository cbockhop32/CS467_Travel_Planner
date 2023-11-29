import React from 'react'
import { ListGroup,Col, Row , Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'




function ExperienceTab({id,name,city,country,rating}) {
    return (  
        <ListGroup.Item style={{height:"75px"}}  variant='primary' className='mt-2 rounded-3'action href={`#link${id}`}>
            <Row>
                <Col  sm={4} lg={4}>
                    <Image className='rounded-3' style={{height:"60px"}} src='/pics/harbin.jpeg'/>
                </Col>
                <Col sm ={6} lg={6}> 
                    <Row>{name}</Row>
                    <Row>{city + ", " +country}</Row>
                </Col>
                <Col sm={2} lg={2} className='text-center'>
                    <Rating readonly={true} iconsCount={1} size={25} initialValue={1} />
                    <p>{rating}</p>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default ExperienceTab;