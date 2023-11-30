import React from 'react'
import { Row, Col, Accordion} from 'react-bootstrap';


function DashboardExperienceAccordion({eventKey,name,location, description}) {
    return ( 

        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>{name}</Accordion.Header>
            <Accordion.Body>
                <Row className='mb-2'>
                    <Col>
                    {name}
                    </Col>
                    <Col>
                    {location}
                    </Col>
                
                </Row>
                <Row >
                    <Col>
                    {description}
                    </Col>
                </Row>
    
            </Accordion.Body>
        </Accordion.Item>

     );
}

export default DashboardExperienceAccordion;