import React, {useState} from 'react'
import {Row, Col} from 'react-bootstrap'
import '../Style/NavBar.css';
import UserLogin from '../UserLogin/UserLogin';
import { NavLink as Link } from "react-router-dom";
import { environment } from '../Environments/EnvDev';


function NavBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const accessToken = localStorage.getItem('access_token')

    const handleLogout = () => {
        localStorage.removeItem('access_token')
    }
  
    return (
        <Row 
        id="NavRow"
        className="justify-content-md-center mb-3 p-2 border-bottom" 
        >
            <Col className='text-light' style={{fontSize:"25px"}}>
               Crowd Sourced Travel Planner
            </Col>
            <Col className='text-center'>
            </Col>
            <Col className='text-center'>
                <Link className="m-2 link-dark" style={{cursor:"pointer"}} to="/">Home</Link>
                <Link className="m-2 link-dark" style={{cursor:"pointer"}} to="/dashboard">My Dashboard</Link>
                <a href={API_BASE_URL + '/login'} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a>
                {/* <a   onClick={handleShow} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> */}
                <UserLogin handleClose={handleClose} show={show} />

                {accessToken == null ? <a   href={environment.api_url + '/login'} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> : <></>}
                

                {accessToken === null ? <></> :<a onClick={handleLogout}  href={environment.api_url + '/logout'} style={{cursor:"pointer"}} className='link-dark m-2'>Logout</a> }
                {/* <a   onClick={handleShow} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> */}
                {/* <UserLogin handleClose={handleClose} show={show} /> */}

            </Col>

     </Row>
    );
}

export default NavBar;