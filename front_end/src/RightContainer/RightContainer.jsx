import React from 'react'

import { Tab } from 'react-bootstrap';

import ExperienceDetails from '../ExperienceDetails/ExperienceDetails';



function RightContainer() {
    return (  

        <Tab.Content className='m-2 rounded-3'  style={{border:"1px black solid", height:"100%", backgroundColor:"#d9d9d9"}}>
            <Tab.Pane eventKey="#link1"  ><ExperienceDetails id = {1}/></Tab.Pane>
            <Tab.Pane eventKey="#link2"><ExperienceDetails id = {2}/></Tab.Pane>
            <Tab.Pane eventKey="#link3"><ExperienceDetails id = {3}/></Tab.Pane>
      </Tab.Content>
    );
}

export default RightContainer;