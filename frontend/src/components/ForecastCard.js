import './ForecastCard.css';

function ForecastCard({cityName, currentTemp, hourTimes, hourTemps}) {

    return <div className="forecastCard">
        <div>
            <div className="cityName">
                {cityName}
            </div>
            <div className="hourTimes">
                {hourTimes}
            </div>
            <div className="hourTemps">
                {hourTemps}                
            </div>
        </div>
        <div className="currentTemp">
            {currentTemp}°
        </div>
    </div>;
}

export default ForecastCard;