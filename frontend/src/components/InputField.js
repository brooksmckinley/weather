import './InputField.css';

function InputField({iconName, type, placeholder, onChange}) {
    return <div className="inputField">
        { /* Only show the icon if it's defined */ }
        { iconName ? <img src={`/icons/${iconName}`} /> : null }
        <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}

export default InputField;