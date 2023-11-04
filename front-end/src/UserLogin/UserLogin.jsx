import React, {useState} from 'react'
import {Modal, Button, Form} from 'react-bootstrap'


function UserLogin({handleClose,show}) {
    const [existingUser, setExistingUser] = useState(true);
    const handleRegister = () => setExistingUser(!existingUser);


    if(existingUser) {
        return ( 
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
    
    
                
            <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                         <Form.Text id="passwordHelpBlock" muted>
                        Forgot Password? <a style={{cursor:"pointer"}} className='link-dark'>Click Here</a>
                    </Form.Text>
                    </Form.Group>
                   
                </Form>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleRegister}>
                Register
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Login
            </Button>
            </Modal.Footer>
            </Modal>
         );
    } else {
        return ( 
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                    </Form.Group>
                </Form>
    
    
    
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleRegister}>
                Current User
            </Button>
            <Button variant="primary" >
                Register
            </Button>
            </Modal.Footer>
            </Modal>
         );



    }


   
    
}

export default UserLogin;