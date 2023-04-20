import { useState } from "react";

import CityCard from "../components/CityCard";
import "./Dashboard.css";

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

    const [cities, setCities] = useState(TEST_CITIES);

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
    
    return <div>
        <h1>Welcome, John</h1>
        <div className="cardContainer">
            { renderCities() }
        </div>
    </div>
}

export default Dashboard;