const express = require('express');
const mongoose = require('mongoose');
const User = require("../schemas/User");
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => 
{
    res.json({msg: "Hello from loginRoutes!"});
});

// Login user
// TODO: Store JWT cookie
router.post('/login', (req, res) =>
{
    
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
