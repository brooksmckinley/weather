import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import ENVIRONMENT from "../utils/environment";
import MESSAGES from "../utils/messages";
import './login.css';

function Register() {
    const navigate = useNavigate();

    // Form field data
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [accountError, setAccountError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Insert code to submit the form
    async function submitForm() {
        // Check first that the form is actually valid before trying to submit
        if (password !== confirmPassword) {
            setAccountError("Passwords do not match");
            return;
        }

        setIsSubmitting(true);

        let body = JSON.stringify({ firstName, lastName, email, password });
        let request = await fetch(`${ENVIRONMENT.BACKEND_URL}/login/register`, {
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
        if (data.msg === MESSAGES.ACCOUNT_CREATED_SUCCESSFULLY) {
            navigate("/");
        } else {
            setAccountError(String(data.msg));
        }

        setIsSubmitting(false);
    }

    function renderErrorText() {
        if (accountError) {
            return <p class="errorText">{ accountError }</p>
        }
    }
    
    return (
        <>
            <h1>Weather App</h1>
            <div class = "login-form">
                <h2>Register</h2>
                <p>Fill out this form.</p>
                { renderErrorText() }
                <div class="firstLastName">
                    <InputField type="text" placeholder="First Name" onChange={(e) => { setFirstName(e.target.value) }} />
                    <InputField type="text" placeholder="Last Name" onChange={(e) => { setLastName(e.target.value) }} />
                </div>
                <InputField type="email" placeholder="E-Mail Address" iconName="email.svg" onChange={(e) => { setEmail(e.target.value) } } />
                <InputField type="password" placeholder="Password" iconName="password.svg" onChange={(e) => { setPassword(e.target.value) } } />
                <InputField type="password" placeholder="Confirm Password" iconName="password.svg" onChange={(e) => { setConfirmPassword(e.target.value) } } />
                <Link to="/">Already have an account? Click here to log in.</Link>
                <button disabled={isSubmitting} onClick={submitForm}>Create Account</button>
            </div>
        </>
    );
}

export default Register;