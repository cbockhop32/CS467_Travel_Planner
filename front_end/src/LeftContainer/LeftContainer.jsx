import React from 'react'

import { ListGroup } from 'react-bootstrap';


function LeftContainer() {
    return ( 

        <ListGroup style={{border:"1px black solid", height:"100%"}}>
            <ListGroup.Item action href="#link1">
            Experience 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
            Experience 2
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            Experience 3
            </ListGroup.Item>
      </ListGroup>
     );
}

export default LeftContainer;