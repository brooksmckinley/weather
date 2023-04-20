import ForecastCard from '../components/ForecastCard';
import './forecast.css';

function Forecast({cityName, currentTemp}) {
    return <div className="forecastPage">
        <div className="forecastCity">
            <b>{cityName}</b>
            <br></br>
        </div>
        <div className="foreCurrentTemp">
            {currentTemp}°
            <br></br>
        </div>
        <br></br>
        <div className="forecastCardTag" style={{maxWidth: "300px"}}>
            <ForecastCard hourTimes={['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm','4pm','5pm','6pm','7pm']} hourWeather={['—','—','—','—','—','—','—','—','—','—','—','—']} hourTemps={['77', '77', '77', '77', '77', '77', '77', '77','77', '77','77', '77']}/>
        </div>
    </div>
}

export default Forecast;