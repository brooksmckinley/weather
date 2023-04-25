import { useState, useMemo } from "react";
import SearchCard from "../components/SearchCard";
import "./Results.css";
import Search from "../components/search";
import { Link } from "react-router-dom";

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
    const [text, searchCity] = useState("");
    const [firstName, setFirstName] = useState("Loading...");

    //Filter the list of cities when the search text changes using a case-insensitive search.
    const resultCities = useMemo(() => TEST_RESULTS.filter(resultCity => resultCity.cityName.toLowerCase().includes(text.toLowerCase())), [text]);

    function renderCities() {
        return resultCities.map(function (resultCity) {
            return <SearchCard
             cityName={resultCity.cityName} 
             state={resultCity.state}
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