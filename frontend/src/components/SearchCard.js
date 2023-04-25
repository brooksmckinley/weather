import './SearchCard.css';

function CityCard({cityName, state}) {

    return <div className="cityCard">
        <div>
            <div className="cityName">
                {cityName}, {state}
            </div>
        </div>
    </div>;
}

export default CityCard;