import React, {useState} from 'react'
import {Row, Col} from 'react-bootstrap'

import UserLogin from '../UserLogin/UserLogin';


function NavBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
        <Row className="justify-content-md-center mb-3 p-2 border-bottom" style={{backgroundColor:"#3c6e71"}}>
            <Col className='text-light' style={{fontSize:"24px"}}>
               Crowd Sourced Travel Planner
            </Col>
            <Col className='text-center'>

            </Col>
            <Col className='text-end'>
                <a  onClick={handleShow} style={{cursor:"pointer"}} className='link-dark'>Login/Register</a>
                <UserLogin handleClose={handleClose} show={show} />

             

            </Col>

     </Row>
    );
}

export default NavBar;