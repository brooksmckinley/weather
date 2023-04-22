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

    //Filtering info we need
    //creates an empty array
    var returnData = [] ; 
    //for each json obj in data copy things from data to return data at that location
    data.forEach(function(obj)
   {
     var tmp= {};
    // Repeat the line below for each field you want to copy
    //tmp is what we want to name it, obj is the name of the field in the api
     tmp['Key'] = obj['Key'];
     tmp['City'] = obj['LocalizedName'];
     tmp['State'] = obj['AdministrativeArea']['LocalizedName'];
     tmp['Country'] = obj['Country']['LocalizedName'];
     

     returnData.push(tmp);
   });

    
    res.json(returnData);
    //res.json(data);

});

router.get('/12hrForecast' , async (req, res) => 
{
    const base = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/';
    const query =  `${req.body['Key']}?apikey=${process.env.ACCUWEATHER_API_KEY} `;
    const response = await fetch(base + query);
    const data = await response.json();

    //filterd data
    var returnData= [];
    data.forEach(function(obj)
    {
      var tmp= {};
     // Repeat the line below for each field you want to copy
     //tmp is what we want to name it, obj is the name of the field in the api
      tmp['DateTime'] = obj['DateTime'];
      tmp['Temperature'] = obj['Temperature']['Value'];
      tmp['Unit'] = obj['Temperature']['Unit'];
      tmp['Conditions'] = obj['IconPhrase'];
      tmp['Precipitation'] = obj['HasPrecipitation'];
      tmp['PrecipitationIntensity'] = obj['PrecipitationIntensity'];

      returnData.push(tmp);
    });
    
    //console.log(data);
    //return data[0];
    //res.json(data);
    res.json(returnData);
})

/////Daily Forecast
router.get('/DailyForecast' , async (req, res) => 
{
    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/';
    const query =  `${req.body['Key']}?apikey=${process.env.ACCUWEATHER_API_KEY} `;
    const response = await fetch(base + query);
    const data = await response.json();

   
    res.json(data);
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