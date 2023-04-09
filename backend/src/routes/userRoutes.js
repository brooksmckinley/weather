const express = require('express');
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
router.delete('/', (req, res) =>
{
    res.json({msg: "Delete user"}); 
});