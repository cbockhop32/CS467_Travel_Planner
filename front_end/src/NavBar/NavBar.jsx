import React from 'react'

import {Row, Col} from 'react-bootstrap'


function NavBar() {
    return (

        <Row className="justify-content-md-center m-2 p-1 border-bottom">
            <Col>
                Crowd Sourced Travel Planner

            </Col>
            <Col className='text-center'>
                View Trips

            </Col>
            <Col className='text-end'>
                Login/Register

            </Col>

     </Row>
  
    );
}

export default NavBar;