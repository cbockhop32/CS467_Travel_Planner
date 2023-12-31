import {React} from 'react'
import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";



function MapboxComponent({lat,lon}) {


    return ( 
    
    <Map
        mapboxAccessToken='pk.eyJ1IjoiY2JvY2tob3AiLCJhIjoiY2xvNHZtcWlmMDVyODJpbnhwb2syOGpxeiJ9.TymNhk3Vg6Lqz30gIB6OAg'
        initialViewState={{
        latitude: lat, 
        longitude:lon, 
        zoom: 8
        }}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
    >
        <Marker latitude={lat} longitude={lon} anchor='bottom'></Marker>

    </Map>
    
    
    );
}

export default MapboxComponent;