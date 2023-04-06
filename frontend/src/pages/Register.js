import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";

function Register() {
    // Form field data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Insert code to submit the form
    function submitForm() {
        console.log("Submit button clicked.");
    }
    
    return (
        <>
            <h1>Weather App</h1>
            <div>
                <h2>Register</h2>
                <p>Fill out this form.</p>
                <div>
                    <InputField type="text" placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                    <InputField type="text" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                </div>
                <InputField type="email" placeholder="E-Mail Address" iconName="email.svg" onChange={(e) => { setEmail(e.target.value) } } />
                <InputField type="password" placeholder="Password" iconName="password.svg" onChange={(e) => { setPassword(e.target.value) } } />
                <InputField type="password" placeholder="Confirm Password" iconName="password.svg" onChange={(e) => { setConfirmPassword(e.target.value) } } />
                <Link to="/">Already have an account? Click here to log in.</Link>
                <button onClick={submitForm}>Create Account</button>
            </div>
        </>
    );
}

export default Register;