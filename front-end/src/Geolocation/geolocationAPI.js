import axios from "axios";
import usaStates from "./usaStates";
import countryNames from "./countryCodes";

//Current bug does not do new api call if name of city does not change, despite change in state or country
const geolocation = async (city, state, country, setLat, setLon) => {

   


    // let APIkey = '3dd6b4b0643fe807a69521e6f5cd399a'
    let baseURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode}&limit=5&appid=3dd6b4b0643fe807a69521e6f5cd399a`
    
        await axios.get(baseURL).then((response)=> {
        console.log(response);

        return response.data


        // setLat(response.data[0].lat);
        // setLon(response.data[0].lon)
    })
    .catch(error => console.error("Error fetching geolocation:", error));
}

export default geolocation;