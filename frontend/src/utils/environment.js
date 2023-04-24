const ENVIRONMENT = {
    BACKEND_URL: process.env.NODE_ENV === "development" ? "http://127.0.0.1:5000" : "https://weather.cop4331-2023.xyz/api",
};

export default ENVIRONMENT;