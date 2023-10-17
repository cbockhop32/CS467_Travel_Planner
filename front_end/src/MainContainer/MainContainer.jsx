import React from 'react'
import {Container, Row, Col, Tab} from 'react-bootstrap';



import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';



function MainContainer() {
    return ( 

        <Tab.Container style={{height:"90vh"}} >
            <Row>
                <Col lg={4}>
                    <LeftContainer />
                </Col>
                <Col lg={8}>
                    <RightContainer/>
                </Col>
            
            </Row>
           
        </Tab.Container>
     );
}

export default MainContainer;