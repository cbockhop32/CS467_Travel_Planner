import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'

import UserLogin from '../UserLogin/UserLogin';
import { NavLink as Link } from "react-router-dom";
import { environment } from '../Environments/EnvDev';
import '../NavBar.css'

function NavBar() {
    const [show, setShow] = useState(false);
    const [visibility, toggleVisibility] = useState(true);
    const [mobileDisplay, toggleMobile] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mediaMatch = () => {
        if (window.matchMedia("(max-width: 650px)").matches){
            toggleVisibility(false)
            toggleMobile(true);
        }
        else{
            toggleVisibility(true)
            toggleMobile(false);

        }
    }

    const accessToken = localStorage.getItem('access_token')

    const handleLogout = () => {
        localStorage.removeItem('access_token')
    }
    useEffect(() => {
        //handles mobile screen resize
        mediaMatch()
        window.addEventListener('resize', mediaMatch, { capture: true });
    },[]);

    const desktopRender = () => {
        return (
            <Row 
            className="justify-content-md-center mb-3 p-2 border-bottom" 
            id= "NavRow"
            >
                <Col className='text-light' style={{fontSize:"25px"}}>
                Crowd Sourced Travel Planner
                </Col>
                <Col className='text-center'>

                </Col>
                <Col className='text-center'>
                    <Link className="m-2 link-dark" style={{cursor:"pointer"}} to="/">Home</Link>
                    <Link className="m-2 link-dark" style={{cursor:"pointer"}} to="/dashboard">My Dashboard</Link>

                    {accessToken == null ? <a   href={environment.api_url + '/login'} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> : <></>}
                    

                    {accessToken === null ? <></> :<a onClick={handleLogout}  href={environment.api_url + '/logout'} style={{cursor:"pointer"}} className='link-dark m-2'>Logout</a> }
                    {/* <a   onClick={handleShow} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> */}
                    {/* <UserLogin handleClose={handleClose} show={show} /> */}

                </Col>

        </Row>
        );
    }
    const closedMobileRender = () => {
        return (
            <Row 
            className="justify-content-md-center mb-3 p-2 border-bottom" 
            id= "NavRow"
            >
                <Col className='text-light' style={{fontSize:"25px"}}>
                Crowd Sourced Travel Planner
                </Col>
                <Col className='text-center'>
                
                {/* Hamburger Icon for mobile version of site */}
                <i id="menu-icon" className="fa fa-bars" onClick={()=> {toggleVisibility(!visibility)}}></i>
                </Col>

        </Row>
        );
    }

    const openeMobileRender = () => {
        return (
            
            <Row 
            className="justify-content-md-center mb-3 p-2 border-bottom" 
            id= "NavRow"
            >
                <Col className='text-light' style={{fontSize:"25px"}}>
                Crowd Sourced Travel Planner
                </Col>
                <Col className='text-center'>
                
                {/* Closing mobile Icon for mobile version of site */}
                <i id="menu-icon" className="fa fa-close" onClick={()=> {toggleVisibility(!visibility)}}></i>

                </Col>
                <Col className='text-center'>
                    <Link 
                    className="m-2 link-dark" style={{cursor:"pointer"}} to="/"
                    onClick={() => {window.matchMedia("(max-width: 700px)").matches? toggleVisibility(false) :toggleVisibility(true) }}>
                        Home
                    </Link>

                    <Link 
                    onClick={() => {window.matchMedia("(max-width: 700px)").matches? toggleVisibility(false) :toggleVisibility(true) }}
                    className="m-2 link-dark" style={{cursor:"pointer"}} to="/dashboard">
                        My Dashboard
                    </Link>

                    {accessToken == null ? <a   href={environment.api_url + '/login'} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> : <></>}
                    

                    {accessToken === null ? <></> :<a onClick={handleLogout}  href={environment.api_url + '/logout'} style={{cursor:"pointer"}} className='link-dark m-2'>Logout</a> }
                    {/* <a   onClick={handleShow} style={{cursor:"pointer"}} className='link-dark m-2'>Login/Register</a> */}
                    {/* <UserLogin handleClose={handleClose} show={show} /> */}

                </Col>

        </Row>
        );
    }

    return (
        <div>
            {!mobileDisplay? desktopRender(): (visibility? openeMobileRender(): closedMobileRender())}
        </div>
    );
}

export default NavBar;