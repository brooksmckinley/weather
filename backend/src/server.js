const mongoose = require('mongoose'),
                Schema = mongoose.Schema,
                bcrypt = require('bcrypt'),
                SALT_WORK_FACTOR = 10;
require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

app.use(express.json());
app.use(cookieParser());
console.log("Environment: " + process.env.NODE_ENV);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// NOTE: All requests to routes in userRoutes MUST be prefixed with "/user". 
// E.g., If you want to access the "thing/" endpoint in userRoutes, you would use the path "/user/thing/" to access it instead of "/thing/".
app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/weather', weatherRoutes);

mongoose.connect(process.env.MONGO_CONNECT_STR)
.then(() => 
{
    console.log("Successfully connected to database");

    // Don't accept requests until connected to database
    app.listen(5000, () => console.log("Listening on port 5000")); // start Node + Express server on port 5000
})
.catch((err) => console.log(err));