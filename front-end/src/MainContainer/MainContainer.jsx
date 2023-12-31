import React,{useContext,useEffect} from 'react'
import {Row, Col, Tab} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';
import { ExperiencesContext } from '../Context/ExperiencesContext';
import axios from 'axios';
import { environment } from '../Environments/EnvDev';

function MainContainer() {    
    return ( 
            <Row className='justify-content-md-center overflow-hidden' style={{height:"85%"}}   >
                <Tab.Container   style={{ width:"100%"}} >
                        <Row  className='justify-content-md-center h-100' style={{maxWidth:"1600px"}}  >
                            <Col lg={4} className='h-100'>
                                <LeftContainer view={"experiences"} dashboardView={false}/>
                            </Col>
                            <Col  lg={8} className='h-100'>
                                <RightContainer  view={"experiences"} dashboardView={false} />
                            </Col>
                        </Row>
                </Tab.Container>
            </Row> 
     );
}

export default MainContainer;