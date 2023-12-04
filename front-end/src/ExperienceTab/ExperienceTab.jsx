import React from 'react'
import { ListGroup,Col, Row , Image } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating'
import '../ExperienceTab.css'



function ExperienceTab({id,name,city,country,rating,img_url}) {
    return (  
        <ListGroup.Item id="ListGroup-Item" variant='primary' className='mt-2 rounded-3'action href={`#link${id}`}>
            <Row>
                <Col  sm={4} lg={4}>
                    <Image id="ExperienceTab-Image" className='rounded-3 text-center' src={img_url === undefined ? '/pics/default.jpeg': img_url}/>
                </Col>
                <Col sm ={6} lg={6}> 
                    <Row id="ExperienceTab-Name">{name}</Row>
                    <Row id="ExperienceTab-City">{city + ", " +country}</Row>
                </Col>
                <Col  id="ExperienceTab-Rating" sm={2} lg={2} className='text-center'>
                    <Rating readonly={true} iconsCount={1} size={25} initialValue={1} />
                    <p>{rating}</p>
                </Col>
            </Row>
        </ListGroup.Item>
    );
}

export default ExperienceTab;