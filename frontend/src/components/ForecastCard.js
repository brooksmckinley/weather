import './ForecastCard.css';


function ForecastCard({hourTimes, hourWeather, hourTemps}) {
    return <div className="forecastCard">
        <div className="forecastTitle">
                <b>12 Hour Forecast</b>
        </div>
        <br></br>
        <div className="forecastContents">
            <div className="hourTimes">
                {hourTimes.map((hour) => <div>{hour}<br></br></div>)}
            </div>
            <div className="hourWeather">
                {hourWeather.map((hour) => <div>{hour}<br></br></div>)}
            </div>
            <div className="hourTemps">
                {hourTemps.map((hour) => <div>{hour}°<br></br></div>)}             
            </div>
        </div>
    </div>;
}

export default ForecastCard;