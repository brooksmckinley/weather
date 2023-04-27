import './SearchCard.css';

function CityCard({cityName, state}) {

    return <div className="searchCityCard">
        <div className="searchCardContents">
            <div className="searchCityName">
                {cityName}, {state}
            </div>
            <div className="addButton">
                <button type = "button" class="add">ADD</button>
            </div>
        </div>
    </div>;
}

export default CityCard;