import React from 'react'

import { ListGroup } from 'react-bootstrap';

import ExperienceTab from '../ExperienceTab/ExperienceTab';


function LeftContainer() {
    return ( 

        <ListGroup className='m-2'  style={{border:"1px black solid", height:"100%", backgroundColor: "#d9d9d9"}}>
            <ExperienceTab id={1} />
            <ExperienceTab id={2} />
            <ExperienceTab id={3} />
      </ListGroup>
     );
}

export default LeftContainer;