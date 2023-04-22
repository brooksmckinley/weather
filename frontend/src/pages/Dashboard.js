import { useState } from "react";
import CityCard from "../components/CityCard";
import "./Dashboard.css";
import Search from "../components/search";
import { Link } from "react-router-dom";

function Dashboard() {
    // Dummy state
    const TEST_CITIES = [
        {
            cityName: "Orlando",
            highTemp: 80,
            lowTemp: 60,
            currentTemp: 77,
        },
        {
            cityName: "Tampa",
            highTemp: 80,
            lowTemp: 60,
            currentTemp: 77,
        },
        {
            cityName: "Phoenix",
            highTemp: 80,
            lowTemp: 60,
            currentTemp: 77,
        },
        {
            cityName: "New York",
            highTemp: 80,
            lowTemp: 60,
            currentTemp: 77,
        },
    ];

    const [text, searchCity] = useState("");
    const [cities, setCities] = useState(TEST_CITIES);
    const [firstName, setFirstName] = useState("Loading...");

    function renderCities() {
        return cities.map(function (city) {
            return <CityCard
             cityName={city.cityName} 
             highTemp={city.highTemp} 
             lowTemp={city.lowTemp} 
             currentTemp={city.currentTemp}
             key={city.cityName}
            />
        })
    }
    function search(){
        return (
            <>  
                <Search type="text" placeholder="Search" iconName="search.svg" onChange={(e) => { searchCity(e.target.value) } } />
            </>
        );
    }
    
    return <div>
        <h1>Welcome, {firstName}</h1>
        <div className="cardContainer">
            { renderCities() }
        </div>
    </div>
}

export default Dashboard;