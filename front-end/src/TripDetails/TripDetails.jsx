import React, {useContext} from 'react'
import { Container,Row, Col, Button,Modal, Dropdown, DropdownButton } from 'react-bootstrap';
import { ExperiencesContext } from '../Context/ExperiencesContext';





function TripDetails({id,name,location,description}) {


    return ( 

        <Container className='h-100 w-100'>
            <Row className='mb-1 text-start'>
                <Col lg={6} style={{fontSize:"28px"}}>
                    <Row>
                        {name}
                    </Row>
                   
                </Col>
                <Col className='mt-2 text-end'   lg={6}>
         

                </Col>
            </Row>
            <Row className='h-50 mb-2'>
                
              
            </Row>
            <hr></hr>

            <Row className='m-2' style={{display:"inline"}} >
                <b>Description:</b> {description}
            </Row>
   
        </Container>
     );
}

export default TripDetails;