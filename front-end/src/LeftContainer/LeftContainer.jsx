import React from 'react'

import { ListGroup } from 'react-bootstrap';

import ExperienceTab from '../ExperienceTab/ExperienceTab';


function LeftContainer() {
    return ( 

        <ListGroup className='m-2 p-2'  style={{ height:"100%", backgroundColor: "#d9d9d9"}}>
            <ExperienceTab id={1} name={"Singapore Gardens"} location={"Singapore"} />
            <ExperienceTab id={2} name={"Berlin Wall"} location={"Berlin, Germany"} />
            <ExperienceTab id={3} name={"Great Wall of China"} location={"Bejing, China"} />
      </ListGroup>
     );
}

export default LeftContainer;