const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'),
                Schema = mongoose.Schema,
                bcrypt = require('bcrypt');

require('dotenv').config();

const {getUserID} = require('../utils.js');

const User = require("../schemas/User");
const router = express.Router();

module.exports = router;

// Sample protected endpoint
router.get('/sample', async (req, res) => 
{
    // If this function returns a non-null value, you can safely assume
    // that the user is logged in.
    const userID = getUserID(req);

    if(userID != null)
    {
        console.log(userID);

        const user = await User.findById(userID);

        res.json({msg: "Hello " + user.firstName + " " + user.lastName + "!"});
    }
    else
    {
        res.status(401);
        res.json({msg: "Unauthorized"});
    }
});

// Login user
router.post('/login', async (req, res) =>
{
    const {email, password} = req.body;

    // Compare passwords
    const user = await User.findOne({ email: email });
    try
    {
        // Create new JWT and store as cookie
        if(user && await bcrypt.compare(password, user.password))
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
        res.status(401);
        res.json({msg: "Invalid username or password"});
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
            res.json({msg : "Account with email " + req.body.email + " already exists."});
        }
        else
        {
            res.status(500);
            res.json({msg : error});
        }
    }
});

router.get('/logout', (req, res) => 
{
    res.clearCookie('jwt');

    res.send({msg: "Logged out successfully"});
});