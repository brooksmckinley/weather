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

// Update non-location info for user
router.patch('/', (req, res) =>
{
    res.json({msg: "Update non-location info for user"}); 
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