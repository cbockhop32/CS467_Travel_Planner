import React,{useState} from 'react'
import {Row, Col, Container} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';
import { ExperiencesProvider } from '../Context/ExperiencesContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { environment } from '../Environments/EnvDev';



function DashboardPage() {
    const [key, setKey] = useState('experiences');


        return ( 

            <>
                 <Tabs
                  id="user-view"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3 w-100 d-flex justify-content-center"
                  
                 >
                    <Tab eventKey="experiences" title="Experiences"  >
                    <Row className='justify-content-md-center overflow-hidden' style={{height:"85vh"}}>
                        <Tab.Container  style={{ width:"100%"}}  >
                            <ExperiencesProvider>
                                <Row  className='justify-content-md-center h-100 ' style={{maxWidth:"1600px"}}  >
                                    <Col lg={4} className='h-100 '>
                                        <LeftContainer view={"experiences"}/>
                                    </Col>
                                    <Col  lg={8} className='h-100'>
                                        <RightContainer view={"experiences"} dashboardView={true} />
                                    </Col>
                                </Row>
                            </ExperiencesProvider>
                        </Tab.Container>
                        </Row> 
                    </Tab>
                    <Tab eventKey="trips" title="Trips">
                        
                        <Row className='justify-content-md-center overflow-hidden' style={{height:"85vh"}}>
                            <Tab.Container   style={{ width:"100%"}} >
                                <ExperiencesProvider>
                                    <Row  className='justify-content-md-center h-100' style={{maxWidth:"1600px"}}  >
                                        <Col lg={4} className='h-100'>
                                            <LeftContainer view={"trips"} />
                                        </Col>
                                        <Col  lg={8} className='h-100'>
                                            <RightContainer view={"trips"} dashboardView={true} />
                                        </Col>
                                    </Row>
                                </ExperiencesProvider>
                            </Tab.Container>
                        </Row> 
                    </Tab>
                </Tabs>
            </>
         
     );
        
    
        
    
}

export default DashboardPage;