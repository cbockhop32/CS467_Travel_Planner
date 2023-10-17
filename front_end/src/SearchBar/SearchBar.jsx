import React from 'react'

import {Form, Stack, Button, Row} from 'react-bootstrap';


function SearchBar() {
    return ( 

        <Row className="justify-content-md-center mb-3 ">

            <Stack className='m-2' direction="horizontal" gap={3} style={{width:"50%"}}>
                <Form.Control className="me-auto" placeholder='Enter Experience Name, Keywords, Location, etc.' />
                <Button variant="secondary">Search</Button>
                <div className="vr" />
                <Button variant="primary">Add</Button>
            </Stack>
        </Row>

        
        );
}

export default SearchBar;