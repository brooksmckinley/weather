import './search.css';

function Search({iconName, type, placeholder, onChange}) {
    return <div className = "search">
        { /* Only show the icon if it's defined */ }
        { iconName ? <img src={`/icons/${iconName}`} /> : null }
        <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}

export default Search;