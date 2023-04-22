const mongoose = require('mongoose'),
                Schema = mongoose.Schema;

const locationSchema = new mongoose.Schema(
    {
        locationKey: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Location", locationSchema);