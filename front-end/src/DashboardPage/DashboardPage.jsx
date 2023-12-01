import React,{useState,useContext} from 'react'
import {Row, Col, Container, Button, Modal, Form} from 'react-bootstrap';
import LeftContainer from '../LeftContainer/LeftContainer';
import RightContainer from '../RightContainer/RightContainer';
import { ExperiencesProvider, ExperiencesContext } from '../Context/ExperiencesContext';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useInputState from '../hooks/useInputState';
import { environment } from '../Environments/EnvDev';
import axios from 'axios';



function DashboardPage() {
    const [key, setKey] = useState('experiences');
    const [show, setShow] = useState(false);
    const [name, updateName, resetName] = useInputState('');
    const [description, updateDescription, resetDescription] = useInputState('');
    const {updateTrips} = useContext(ExperiencesContext);


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        // clear input fields
        // resetFields();
    }  

    const updateTripsList = () => {
        axios
        .get(`${environment.api_url}/trips`,
        {
            headers: headers
        })
        .then((res) => {updateTrips(res.data.trips);},[])
        .catch(e => console.log(e))
    }

    
    const handleAddTrip = () => {
        axios.post(`${environment.api_url}/trips`,
        {   
                trip_name: name,
                description: description,
                public: true
        },
        {
            headers: headers
        })
        .then((res) => {
            console.log(res)
            updateTripsList()
        })
        .catch((e)=>{
            if(e.response.status === 401) {
                alert("Please login or create an account inorder to add a Trip")
            }
            console.log(e)
        })

        handleClose();
    }



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
                            {/* <ExperiencesProvider> */}
                                <Row  className='justify-content-md-center h-100 ' style={{maxWidth:"1600px"}}  >
                                    <Col lg={4} className='h-100 '>
                                        <LeftContainer view={"experiences"}/>
                                    </Col>
                                    <Col  lg={8} className='h-100'>
                                        <RightContainer view={"experiences"} dashboardView={true} />
                                    </Col>
                                </Row>
                            {/* </ExperiencesProvider> */}
                        </Tab.Container>
                        </Row> 
                    </Tab>
                    <Tab eventKey="trips" title="Trips">

                    <Row className='justify-content-md-center overflow-hidden' style={{height:"85vh"}}>

                        <Row className='justify-content-center'>                     
                            <Button variant="primary" className='w-25'  onClick={handleShow}>Add Trip</Button>
                        </Row>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add A Trip</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Name of Trip</Form.Label>
                                        <Form.Control 
                                            value={name}
                                            onChange={updateName}
                                        />
                            
                                    </Form.Group>
                            
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" rows={3} 
                                               value={description}
                                               onChange={updateDescription}
                                        />
                                    </Form.Group>
                                
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddTrip} >
                                Add
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        
                        <Tab.Container   style={{ width:"100%"}} >
                            {/* <ExperiencesProvider> */}
                                <Row  className='justify-content-md-center h-100' style={{maxWidth:"1600px"}}  >
                                    <Col lg={4} className='h-100'>
                                        <LeftContainer view={"trips"} />
                                    </Col>
                                    <Col  lg={8} className='h-100'>
                                        <RightContainer view={"trips"} dashboardView={true} />
                                    </Col>
                                </Row>
                            {/* </ExperiencesProvider> */}
                        </Tab.Container>
                    </Row> 
                    </Tab>
                </Tabs>
           


            </>
         
     );
        
    
        
    
}

export default DashboardPage;