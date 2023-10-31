import React from 'react'

import {Row, Col} from 'react-bootstrap'


function NavBar() {
    return (
        <Row className="justify-content-md-center mb-3 p-2 border-bottom" style={{backgroundColor:"#3c6e71"}}>
            <Col className='text-light' style={{fontSize:"24px"}}>
               Crowd Sourced Travel Planner
            </Col>
            <Col className='text-center'>

            </Col>
            <Col className='text-end'>
                Login/Register

            </Col>

     </Row>
    );
}

export default NavBar;