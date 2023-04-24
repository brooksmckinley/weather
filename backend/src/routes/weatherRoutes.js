const express = require('express');
const router = express.Router();
require('dotenv').config();

module.exports = router;

router.get('/citySearch', async (req, res) => 
{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search'; //base url from api website
    
    // use a ? when you are putting a parameter at the end
    // make it a template string so that we can put the variable key in it
    const query = `?apikey=${process.env.ACCUWEATHER_API_KEY}&q=${req.body['city']}`;

    // combine them together and fetch info
    const response = await fetch(base + query);

    // when you get response you need to turn is into a json data
    const data = await response.json();

    // Filtering info we need
    // creates an empty array
    var returnData = [] ; 
    // for each json obj in data copy things from data to return data at that location
    data.forEach(function(obj)
   {
     var tmp= {};
    // Repeat the line below for each field you want to copy
    // tmp is what we want to name it, obj is the name of the field in the api
     tmp['Key'] = obj['Key'];
     tmp['City'] = obj['LocalizedName'];
     tmp['State'] = obj['AdministrativeArea']['LocalizedName'];
     tmp['Country'] = obj['Country']['LocalizedName'];
     

     returnData.push(tmp);
   });

    res.json(returnData);
});

router.get('/12hrForecast' , async (req, res) => 
{
    const base = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
    const query =  `${req.body['Key']}?apikey=${process.env.ACCUWEATHER_API_KEY} `;
    const response = await fetch(base + query);
    const data = await response.json();

    //filterd data
    var returnData= [];

    try
    {
        data.forEach(function(obj)
        {
            var tmp= {};
            // Repeat the line below for each field you want to copy
            // tmp is what we want to name it, obj is the name of the field in the api
            tmp['DateTime'] = obj['DateTime'];
            tmp['Temperature'] = obj['Temperature']['Value'];
            tmp['Unit'] = obj['Temperature']['Unit'];
            tmp['Conditions'] = obj['IconPhrase'];
            tmp['Precipitation'] = obj['HasPrecipitation'];
            tmp['PrecipitationIntensity'] = obj['PrecipitationIntensity'];
    
            returnData.push(tmp);
        });
    }
    catch(error)
    {
        res.status(400);
        if(data['Code'] === "400")
        {
            res.json({msg: "Missing \'Key\' field from request body"});
        }
        else
        {
            res.json(data);
        }
    }

    res.json(returnData);
})

/////Daily Forecast
router.post('/DailyForecast' , async (req, res) => 
{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query =  `${req.body['Key']}?apikey=${process.env.ACCUWEATHER_API_KEY}&details=true`;
    const response = await fetch(base + query);
    const data = await response.json();

   
    res.json(data);
})