const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'),
                Schema = mongoose.Schema,
                bcrypt = require('bcrypt');

require('dotenv').config();

const User = require("../schemas/User");
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => 
{
    res.json({msg: "Hello from loginRoutes!"});
});

// Login user
router.post('/login', async (req, res) =>
{
    const {email, password} = req.body;
    console.log("email: " + email);
    console.log("password: " + password);

    // Compare passwords
    const user = await User.findOne({ email: email });
    console.log("Validating password for " + user.firstName + " " + user.lastName);
    try
    {
        // Create new JWT and store as cookie
        if(await bcrypt.compare(password, user.password))
        {
            const token = jwt.sign( { _id : user._id }, Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'));

            // Set cookie
            res.cookie('jwt', token);

            res.json({msg: "Logged in successfully"});
        }
        else
        {
            res.status(401);
            res.json({msg: "Invalid username or password"});
        }
    }
    catch (err)
    {
        console.error(err);
    }
});

// Register user in database
router.post('/register', async (req, res) =>
{
    const {firstName, lastName, email, password} = req.body;
    try
    {
        const user = await User.create(
            {
                firstName: firstName,
                lastName: lastName, 
                email: email,
                password: password
            }
        );
    
        res.status(201);
        res.json({msg: "Account created successfully!"});
    }
    catch(error)
    {
        // console.error(error);
        if(error.code === 11000)
        {
            res.status(409);
            res.json({error : "Account with email " + req.body.email + " already exists."});
        }
        else
        {
            res.status(500);
            res.json({error : error});
        }
    }
});
