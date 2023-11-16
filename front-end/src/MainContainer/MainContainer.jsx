import React from 'react'
import {Row, Col, Tab} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';
import { TripsProvider } from '../Context/TripsContext';


function MainContainer() {
    return ( 

        <Row className='justify-content-md-center overflow-hidden' style={{height:"85%"}}  >
                    <Tab.Container   style={{ width:"100%"}} >
                        <TripsProvider>
                            <Row  className='justify-content-md-center h-100' style={{maxWidth:"1600px"}}  >
                                <Col lg={4} className='h-100'>
                                    <LeftContainer />
                                </Col>
                                <Col  lg={8} className='h-100'>
                                    <RightContainer />
                                </Col>
                            </Row>
                        </TripsProvider>
                    </Tab.Container>
        </Row> 

     );
}

export default MainContainer;