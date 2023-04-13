import './CityCard.css';

function CityCard({cityName, highTemp, lowTemp, currentTemp}) {

    return <div className="cityCard">
        <div>
            <div className="cityName">
                {cityName}
            </div>
            <div className="highLowTemp">
                H: {highTemp}°F L: {lowTemp}°F
            </div>
        </div>
        <div className="currentTemp">
            {currentTemp}°
        </div>
    </div>;
}

export default CityCard;