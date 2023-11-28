import React, {useState} from 'react'
import {Row, Col} from 'react-bootstrap'

import UserLogin from '../UserLogin/UserLogin';
import { NavLink as Link } from "react-router-dom";

function NavBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const API_BASE_URL = 'https://travel-planner-467.wl.r.appspot.com';

  
    return (
        <Row 
        className="justify-content-md-center mb-3 p-2 border-bottom" 
        style={{
            backgroundColor:"#3c6e71", 
            height:"10%", 
            maxHeight:"65px",
            position: "sticky",
            top: 0}}
        >
            <Col className='text-light' style={{fontSize:"25px"}}>
               Crowd Sourced Travel Planner
            </Col>
            <Col className='text-center'>

            </Col>
            <Col className='text-center'>
                 <Link className="m-2 link-dark" style={{cursor:"pointer"}} to="/">Home</Link>
                <Link className="m-2 link-dark" style={{cursor:"pointer"}} to="/dashboard">My Dashboard</Link>
                <a   href={API_BASE_URL + '/login'} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a>
                {/* <a   onClick={handleShow} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> */}
                <UserLogin handleClose={handleClose} show={show} />

            </Col>

     </Row>
    );
}

export default NavBar;