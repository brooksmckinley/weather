const mongoose = require('mongoose'),
                Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema(
    {
        Key: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        },
        State: {
            type: String,
            required: true
        },
        Country: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Location", locationSchema);