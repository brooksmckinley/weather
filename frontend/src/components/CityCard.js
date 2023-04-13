import './CityCard.css';

function CityCard({cityName, highTemp, lowTemp, currentTemp}) {

    return <div className="cityCard">
        <div>
            <div>
                {cityName}
            </div>
            <div>
                H: {highTemp}°F L: {lowTemp}°F
            </div>
        </div>
        <div>
            {currentTemp}°
        </div>
    </div>;
}

export default CityCard;