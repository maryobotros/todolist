// Import mongoose library
const mongoose = require("mongoose");

// Create the schema
const ActivitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
    }

});

// Create a variable out of the schema
const ActivityModel = mongoose.model("activities", ActivitySchema);

// Export it so that there is access to ActivityModel outside of this file
module.exports = ActivityModel;