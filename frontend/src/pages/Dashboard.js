import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/search";

function Dashboard() {
    const [text, searchCity] = useState("");

    return (
        <>  
            <Search type="text" placeholder="Search" iconName="search.svg" onChange={(e) => { searchCity(e.target.value) } } />
        </>
    );
}

export default Dashboard;