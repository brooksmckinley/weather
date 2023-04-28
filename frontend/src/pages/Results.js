import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../components/SearchCard";
import "./Results.css";
import Search from "../components/search";
import { Link } from "react-router-dom";
import ENVIRONMENT from "../utils/environment";

// Dummy state
// TODO: Replace all instances of TEST_CITIES with a real array of cities obtained from the API.
const TEST_RESULTS = [
    {
        cityName: "Grand Island",
        state: "FL"
    },
    {
        cityName: "Grand Island",
        state: "NY"
    },
    {
        cityName: "Grand Island",
        state: "NE"
    },
    {
        cityName: "Grand Island",
        state: "IL"
    },
];

function Results() {
    const navigate = useNavigate();

    const [text, searchCity] = useState("");
    const [resultCities, setResultCities] = useState([]);

    useEffect(() => {
        let active = true;

        async function performSearch() {
            const searchRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/weather/citySearch`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "include", // include, *same-origin, omit
                headers: {
                  "Content-Type": "application/json",
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({ city: text }),
            });
            const search = await searchRequest.json();

            if (active) {
                setResultCities(search);
            }
        }
        performSearch();

        return () => active = false;
    }, [text]);

    async function addCity(city) {
        const addRequest = await fetch(`${ENVIRONMENT.BACKEND_URL}/user/location`, {
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
                locationKey: city.Key,
                city: city.City,
                state: city.State,
                country: city.Country,
            }),
        });
        const search = await addRequest.json();

        // Once the add operation finishes, send the user back to the dashboard.
        navigate("/dashboard");
    }

    function renderCities() {
        return resultCities.map(function (resultCity) {
            return <SearchCard
             cityName={resultCity.City} 
             state={resultCity.State}
             key={resultCity.Key}
             onAdd={() => addCity(resultCity)}
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
        <h1>Search Results</h1>
        <div className="cardContainer">
            { search() }
            <br />
            { renderCities() }
        </div>
    </div>
}

export default Results;