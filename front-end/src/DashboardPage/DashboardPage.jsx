import React,{useState} from 'react'
import {Row, Col, Container} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';
import { ExperiencesProvider } from '../Context/ExperiencesContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function DashboardPage() {
    const [key, setKey] = useState('experiences');
 
    return ( 

        <Row className='justify-content-md-center' style={{height:"85%"}}>

                 <Tabs
                  id="user-view"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3 w-50"
                  fill
                 >


                    <Tab eventKey="experiences" title="Experiences"  >


                            <Tab.Container  style={{ width:"100%"}}  >
                                <ExperiencesProvider>
                                    <Row  className='justify-content-md-center h-100' style={{maxWidth:"1600px"}}  >
                                        <Col lg={4} className='h-100 overflow-hidden'>
                                            <LeftContainer view={"experiences"}/>
                                        </Col>
                                        <Col  lg={8} className='h-100'>
                                            <RightContainer view={"experiences"} />
                                        </Col>
                                    </Row>
                                </ExperiencesProvider>
                            </Tab.Container>

                    </Tab>



                    <Tab eventKey="trips" title="Trips">
                        

                            <Tab.Container   style={{ width:"100%"}} >
                                <ExperiencesProvider>
                                    <Row  className='justify-content-md-center h-100' style={{maxWidth:"1600px"}}  >
                                        <Col lg={4} className='h-100'>
                                            <LeftContainer view={"trips"} />
                                        </Col>
                                        <Col  lg={8} className='h-100'>
                                            <RightContainer view={"trips"} />
                                        </Col>
                                    </Row>
                                </ExperiencesProvider>
                            </Tab.Container>

                    </Tab>

                </Tabs>
        </Row> 

        
         
     );
}

export default DashboardPage;