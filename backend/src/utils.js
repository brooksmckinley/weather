const jwt = require('jsonwebtoken');

// To use in another file, add the line below to the top of your code
// const {functionsToImport} = require('../utils.js');
// Replace "functionsToImport" with a comma separated list of functions from this file to import (e.g., getUserID, foo)

module.exports = 
{
    getUserID: function(req)
    {
        // Validate JWT
        try
        {
            var decoded = jwt.verify(req.cookies['jwt'], Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64'), {maxAge: "1d"});

            return decoded['_id'];
        }
        catch(err)
        {
            console.error(err);

            return null;
        }
    }
    
    // Add new functions using the syntax below:
    // functionName: function(params) {}
}