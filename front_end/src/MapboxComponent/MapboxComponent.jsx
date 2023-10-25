import {React, useEffect,useState, useRef} from 'react'

import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { environment } from '../Environments/EnvDev';
import 'mapbox-gl/dist/mapbox-gl.css';


function MapboxComponent() {


    return ( 
    
    <Map
        mapboxAccessToken='pk.eyJ1IjoiY2JvY2tob3AiLCJhIjoiY2xvNHZtcWlmMDVyODJpbnhwb2syOGpxeiJ9.TymNhk3Vg6Lqz30gIB6OAg'
        initialViewState={{
        latitude: 45.76249949984288,
        longitude:126.73029898440065,
        zoom: 8
        }}

        
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
    >
        <Marker latitude={45.76249949984288} longitude={126.73029898440065} anchor='bottom'></Marker>

    </Map>
    
    
    );
}

export default MapboxComponent;