const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => 
{
    res.json({msg: "Hello from Express!"});
});

router.post('/login', (req, res) =>
{
    
})