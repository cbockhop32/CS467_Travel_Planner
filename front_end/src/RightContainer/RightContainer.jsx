import React from 'react'

import { Tab } from 'react-bootstrap';



function RightContainer() {
    return (  

        <Tab.Content style={{border:"1px black solid", height:"85vh"}}>
            <Tab.Pane eventKey="#link1">Experience 1 Content</Tab.Pane>
            <Tab.Pane eventKey="#link2">Experience 2 Content</Tab.Pane>
      </Tab.Content>
    );
}

export default RightContainer;