const express = require('express');
const router = express.Router();
require('dotenv').config(); //import for the file with all the secrets


module.exports = router;

router.get('/citySearch', async (req, res) => 
{
   //res.json(data);
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'; //base url from api website
    
    // use a ? when you are putting a parameter at the end
    // make it a template string so that we can put the variable key in it
    const query = `?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${req.body['city']}`;

    //combine them together and fetch info
    const response = await fetch(base + query);

    //when you get response you need to turn is into a json data
    const data = await response.json();

    //logs it into console
    //console.log(data);

    //returns the first array of info from the live server
    //return data[0];
    res.json(data);

});

router.get('/Forecast' , async (req, res) => 
{
    
})

// Update non-location info for user
router.patch('/', (req, res) =>
{
    res.json({msg: "Update non-location info for user"}); 
});

// Delete user from database
router.delete('/', (req, res) =>
{
    res.json({msg: "Delete user"}); 
});