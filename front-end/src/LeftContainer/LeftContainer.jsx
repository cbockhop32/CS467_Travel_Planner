import React from 'react'

import { ListGroup } from 'react-bootstrap';

import ExperienceTab from '../ExperienceTab/ExperienceTab';


function LeftContainer() {
    return ( 

        <ListGroup className='m-2 p-2'  style={{ height:"95%", backgroundColor: "#d9d9d9", overflowY:"scroll"}}>
            <ExperienceTab id={1} name={"Singapore Gardens"} location={"Singapore"} />
            <ExperienceTab id={2} name={"Berlin Wall"} location={"Berlin, Germany"} />
            <ExperienceTab id={3} name={"Great Wall of China"} location={"Bejing, China"} />
            <ExperienceTab id={4} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={5} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={6} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={7} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={8} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={9} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={10} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={11} name={"Great Wall of China"} location={"Bejing, China"} />


            <ExperienceTab id={12} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={13} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={14} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={15} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={16} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={17} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={18} name={"Great Wall of China"} location={"Bejing, China"} />


            <ExperienceTab id={19} name={"Great Wall of China"} location={"Bejing, China"} />

            <ExperienceTab id={20} name={"Last Experience"} location={"Bejing, China"} />

      </ListGroup>
     );
}

export default LeftContainer;