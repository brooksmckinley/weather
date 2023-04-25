import { useNavigate } from 'react-router-dom';

import './CityCard.css';

function CityCard({cityName, cityKey, highTemp, lowTemp, currentTemp}) {
    const navigate = useNavigate();

    return <div onClick={() => navigate(`/forecast/${cityKey}/${cityName}`)} className="cityCard">
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