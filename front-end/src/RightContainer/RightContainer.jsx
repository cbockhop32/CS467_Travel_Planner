import React from 'react'

import { Tab } from 'react-bootstrap';

import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';



function RightContainer() {
    return (  
        <Tab.Content className='m-2 p-2 rounded-3'  style={{height:"100%", backgroundColor:"#d9d9d9"}}>
            <Tab.Pane eventKey="#link1"  ><ExperienceDetails id = {1} name={"Singapore Gardens"} location={"Singapore"}/></Tab.Pane>
            <Tab.Pane eventKey="#link2"><ExperienceDetails id = {2} name={"Berlin Wall"} location={"Berlin, Germany"}/></Tab.Pane>
            <Tab.Pane eventKey="#link3"><ExperienceDetails id = {3} name={"Great Wall of China"} location={"Bejing, China"}/></Tab.Pane>
      </Tab.Content>
    );
}

export default RightContainer;