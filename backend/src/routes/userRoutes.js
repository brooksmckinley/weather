const express = require('express');
const mongoose = require('mongoose'),
                Schema = mongoose.Schema,
                bcrypt = require('bcrypt');

require('dotenv').config();

const {getUserID} = require('../utils.js');

const User = require("../schemas/User");
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => 
{
    res.json({msg: "Hello from Express!"});
});

// TODO: Finish this function
// Update non-location info for user
router.patch('/', async (req, res) =>
{
    // res.json({msg: "Update non-location info for user"});

    // If this function returns a non-null value, you can safely assume
    // that the user is logged in.
    const userID = getUserID(req);

    if(userID != null)
    {
        // Remove empty fields from request body
        for(var key of Object.keys(req.body))
        {
            console.log(key + ": " + req.body[key]);
            if(!req.body[key] || key === "password")
            {
                delete req.body[key];
            }
        }

        console.log(req.body);
        if(Object.keys(req.body).length === 0)
        {
            res.status(400);
            res.json({msg: "Invalid request: All fields empty or missing"});
        }
        else
        {
            const user = await User.findOneAndUpdate({_id: userID}, req.body, {new: true});
            res.json({msg: "Hello " + user.firstName + " " + user.lastName + "!"});
        }
    }
    else
    {
        res.status(401);
        res.json({msg: "Unauthorized"});
    }
});

// Delete user from database
router.delete('/', async (req, res) =>
{
    const userID = getUserID(req);

    if(userID != null)
    {
        console.log(userID);

        const user = await User.findOneAndDelete({_id: userID});
        console.log("Deleted " + user);

        // Remove cookie for non-existent user
        res.clearCookie('jwt');

        res.json({msg: "Deleted " + userID});
    }
    else
    {
        res.status(401);
        res.json({msg: "Unauthorized"});
    }
});