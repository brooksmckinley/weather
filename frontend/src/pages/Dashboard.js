import { useState, useMemo, useEffect } from "react";
import CityCard from "../components/CityCard";
import "./Dashboard.css";
import Search from "../components/search";
import { Link } from "react-router-dom";
import ENVIRONMENT from "../utils/environment";

// Dummy state
// TODO: Replace all instances of TEST_CITIES with a real array of cities obtained from the API.
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

function Dashboard() {
    const [text, searchCity] = useState("");
    const [cities, setCities] = useState([]);
    const [firstName, setFirstName] = useState("Loading...");

    // Load in user data and their locations when the page first loads.
    useEffect(() => {
        let active = true;

        const loadUserData = async () => {
            // Load in user info and basic location information
            const userRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/user`);
            const user = await userRequest.json();

            const forecasts = [];
            // Load in each of the user's locations in parallel
            await Promise.all(user.locations.map(async (city) => {
                const forecastRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/weather/DailyForecast`, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: "same-origin", // include, *same-origin, omit
                    headers: {
                      "Content-Type": "application/json",
                    },
                    redirect: "follow", // manual, *follow, error
                    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: { Key: city.locationKey }
                });
                const forecast = await forecastRequest.json();
                forecasts[city.locationKey] = forecast;
            }));

            // Place all of the loaded information into state if the component that called this effect hasn't been removed.
            if (active) {
                setCities(user.locations.map((city) => {
                    return {
                        cityName: city.city,
                        highTemp: forecasts[city.locationKey].DailyForecasts[0].Temperature.Maximum.Value,
                        lowTemp: forecasts[city.locationKey].DailyForecasts[0].Temperature.Minimum.Value,
                        currentTemp: 30,
                        key: city.locationKey,
                    };
                }));
                setFirstName(user.firstName);
            }
        };
        loadUserData();

        return () => active = false;
    }, []);

    // Filter the list of cities when the search text changes using a case-insensitive search.
    const filteredCities = useMemo(() => TEST_CITIES.filter(city => city.cityName.toLowerCase().includes(text.toLowerCase())), [text]);

    function renderCities() {
        return filteredCities.map(function (city) {
            return <CityCard
             cityName={city.cityName} 
             highTemp={city.highTemp} 
             lowTemp={city.lowTemp} 
             currentTemp={city.currentTemp}
             key={city.key}
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
            { search() }
            <br />
            { renderCities() }
        </div>
    </div>
}

export default Dashboard;