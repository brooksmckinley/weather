import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import './login.css';

function Login() {
    // Form field data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Insert code to submit the form
    function submitForm() {
        console.log("Submit button clicked.");
    }
    
    return (
        <>
            <h1>Weather App</h1>
            <div class = "login-form">
                <h2>Sign-In</h2>
                <p>Fill out this form.</p>
                <InputField type="email" placeholder="E-Mail Address" iconName="email.svg" onChange={(e) => { setEmail(e.target.value) } } />
                <InputField type="password" placeholder="Password" iconName="password.svg" onChange={(e) => { setPassword(e.target.value) } } />
                <Link to="/register">Don't have an account? Click here to register.</Link> <p></p>
                <button onClick={submitForm}>Sign-In </button>
            </div>
        </>
    );
}

export default Login;