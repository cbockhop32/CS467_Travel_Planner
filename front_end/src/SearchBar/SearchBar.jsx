import React from 'react'

import {Form, Row} from 'react-bootstrap';


function SearchBar() {
    return ( 

        <Row className="justify-content-md-center m-2">
              <Form.Control
            placeholder='Enter Experience Name, Keywords, Location, etc.'
            style={{width: "50%"}}
            >
            </Form.Control>
        </Row>
        
        );
}

export default SearchBar;