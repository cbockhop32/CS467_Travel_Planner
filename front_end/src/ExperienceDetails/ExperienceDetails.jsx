import React, { memo } from 'react'
import { Container, Carousel, Row } from 'react-bootstrap';


function ExperienceDetails({id}) {
    return ( 
        <Container>
            <Row>
               Experience details {id}
            </Row>
        </Container>
     );
}

export default ExperienceDetails;