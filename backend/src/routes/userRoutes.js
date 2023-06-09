const express = require('express');
const mongoose = require('mongoose'),
                Schema = mongoose.Schema,
                bcrypt = require('bcrypt');

require('dotenv').config();

const {getUserID} = require('../utils.js');

const User = require("../schemas/User");
const router = express.Router();

module.exports = router;

// Returns info for currently logged in user
router.get('/', async (req, res) => 
{
    const userID = getUserID(req);

    if(userID != null)
    {
        console.log(userID);

        const user = await User.findById(userID);

        // Don't return the user's password hash
        user['password'] = "HIDDEN";
        
        res.json(user);
    }
    else
    {
        res.status(401);
        res.json({msg: "Unauthorized"});
    }
});

// Update non-location info for user
router.patch('/', async (req, res) =>
{
    const userID = getUserID(req);

    if(userID != null)
    {
        // Remove empty fields from request body
        for(var key of Object.keys(req.body))
        {
            if(!req.body[key])
            {
                delete req.body[key];
            }
        }

        if(Object.keys(req.body).length === 0)
        {
            res.status(400);
            res.json({msg: "Invalid request: All fields empty or missing"});
        }
        else
        {
            try
            {
                // Update user
                const user = await User.findById(userID);

                for(var key of Object.keys(req.body))
                {
                    user[key] = req.body[key];
                }

                // Had to use save instead of findOneAndUpdate because I needed my password hashing middleware to hash the updated password
                user.save();
                res.json({msg: "Successfully updated user info for " + user.firstName + " " + user.lastName});
            }
            catch(error)
            {   
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
        const user = await User.findOneAndDelete({_id: userID});

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

// Add location to currently logged in user
router.post('/location', async (req, res) => 
{
    const userID = getUserID(req);

    if(userID != null)
    {
        const user = await User.findById(userID);

        if(isLocationValid(req))
        {
            try
            {
                user.locations.push(req.body);
                user.save();
            }
            catch(error)
            {
                res.status(500);
                res.json({msg : error});
            }

            res.status(201);
            res.json({msg: "Successfully added " + req.body['city'] + " to locations"});
        }
        else
        {
            res.status(400);
            res.json({msg: "Missing one or more required fields"});
        }
    }
    else
    {
        res.status(401);
        res.json({msg: "Unauthorized"});
    }
});

// Deletes the first location matching locationKey in the requestBody from the currently logged in user
router.post('/deleteLocation', async (req, res) => 
{
    const userID = getUserID(req);

    if(userID != null)
    {
        const user = await User.findById(userID);

        if(req.body['locationKey'])
        {
            try
            {
                // Couldn't get findIndex to work, so I'm doing this manually
                for(let i = 0; i < user.locations.length; i++)
                {
                    if(user.locations[i]['locationKey'] === req.body['locationKey'])
                    {
                        user.locations.splice(i, 1);
                        break;
                    }
                }

                user.save();
            }
            catch(error)
            {
                res.status(500);
                res.json({msg : error});
            }

            res.status(201);
            res.json({msg: "Successfully deleted location " + req.body['locationKey'] + " from locations"});
        }
        else
        {
            res.status(400);
            res.json({msg: "locationKey missing from request body"});
        }
    }
    else
    {
        res.status(401);
        res.json({msg: "Unauthorized"});
    }
});

function isLocationValid(req)
{
    return req.body['locationKey'] && req.body['city'] && req.body['state'] && req.body['country'];
}
