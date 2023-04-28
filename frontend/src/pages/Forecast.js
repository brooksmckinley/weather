import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import ForecastCard from '../components/ForecastCard';
import ENVIRONMENT from '../utils/environment';
import './forecast.css';

function Forecast() {
    const navigate = useNavigate();

    const { location, cityName } = useParams();

    const [forecast, setForecast] = useState([]);
    const [currentTemp, setCurrentTemp] = useState("Loading...");

    useEffect(() => {
        let active = true;

        const loadForecast = async () => {
            const forecastRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/weather/12hrForecast`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({ Key: location }),
            });
            const forecast = await forecastRequest.json();

            const currentConditionsRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/weather/DailyForecast`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({ Key: location }),
            });
            const currentConditions = await currentConditionsRequest.json();

            if (active) {
                setCurrentTemp(`${currentConditions[0].Temperature.Imperial.Value}°`)
                setForecast(forecast);
            }
        };
        loadForecast();

        return () => active = false;
    }, [location]);

    async function deleteCity() {
        const deleteRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/user/deleteLocation`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                locationKey: location,
            }),
        });
        await deleteRequest.text();

        // Once the add operation finishes, send the user back to the dashboard.
        navigate("/dashboard");
    }

    const hours = useMemo(() => {
        return forecast.map((hourForecast) => {
            const hourNum = new Date(hourForecast.DateTime).getHours();
            if (hourNum >= 12) {
                return hourNum === 12 ? "12pm" : `${hourNum % 12}pm`;
            } else {
                return hourNum === 0 ? "12am" : `${hourNum % 12}am`;
            }
        });
    }, [forecast]);
    const hourTemps = useMemo(() => {
        return forecast.map((hourForecast) => hourForecast.Temperature);
    }, [forecast]);

    return <div className="forecastPage">
        <div className="forecastButton">
            <button onClick={() => navigate("/dashboard")} type = "button">Back</button>
            <button onClick={deleteCity} type = "button" class="delete">Delete</button>
        </div>
        <br></br>
        <div className="forecastCity">
            <b>{cityName}</b>
            <br></br>
        </div>
        <div className="foreCurrentTemp">
            {currentTemp}
            <br></br>
        </div>
        <br></br>
        <div className="forecastCardTag" style={{maxWidth: "300px"}}>
            {
                forecast.length > 0 
                ? <ForecastCard hourTimes={hours} hourWeather={['—','—','—','—','—','—','—','—','—','—','—','—']} hourTemps={hourTemps}/>
                : null
            }
        </div>
    </div>
}

export default Forecast;