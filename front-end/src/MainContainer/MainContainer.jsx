import React from 'react'
import {Row, Col, Tab} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';



function MainContainer() {
    return ( 
        <Row className='justify-content-md-center'>
               <Tab.Container fluid style={{height:"90vh", width:"100%" }} >
                    <Row fluid className='justify-content-md-center' style={{maxWidth:"1600px"}}  >
                        <Col lg={4}>
                            <LeftContainer />
                        </Col>
                        <Col lg={8}>
                            <RightContainer/>
                        </Col>
                    </Row>
                </Tab.Container>
        </Row>
     );
}

export default MainContainer;