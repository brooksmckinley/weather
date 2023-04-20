import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import './login.css';
import MESSAGES from '../utils/messages';

function Login() {
    const navigate = useNavigate();

    // Form field data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [accountError, setAccountError] = useState(null);

    async function submitForm() {
        let body = JSON.stringify({email, password});
        let request = await fetch("http://localhost:5000/login/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body, // body data type must match "Content-Type" header
          });

        let data = await request.json();
        // Show a visible error if the API returns one.
        if (data.msg === MESSAGES.LOGGED_IN_SUCCESSFULLY) {
            navigate("/dashboard");
        } else {
            setAccountError(String(data.msg));
        }
    }

    function renderErrorText() {
        if (accountError) {
            return <p className="errorText">{accountError}</p>
        }
    }
    
    return (
        <>
            <h1>Weather App</h1>
            <div class = "login-form">
                <h2>Sign-In</h2>
                <p>Fill out this form.</p>
                { renderErrorText() }
                <InputField type="email" placeholder="E-Mail Address" iconName="email.svg" onChange={(e) => { setEmail(e.target.value) } } />
                <InputField type="password" placeholder="Password" iconName="password.svg" onChange={(e) => { setPassword(e.target.value) } } />
                <Link to="/register">Don't have an account? Click here to register.</Link> <p></p>
                <button onClick={submitForm}>Sign-In </button>
            </div>
        </>
    );
}

export default Login;