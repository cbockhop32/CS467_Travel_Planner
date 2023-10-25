import React from 'react'
import {Container, Row, Col, Tab} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';



function MainContainer() {
    return ( 

        <Tab.Container fluid   style={{height:"90vh"}} >
            <Row fluid className='justify-content-md-center'  style={{maxWidth:"1600px"}} >
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