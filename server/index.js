// Import libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Give access to the Activity Model
const ActivityModel = require("./models/Activity");

// Connect the database to MongoDB
mongoose.connect("mongodb+srv://user123:Password123@cluster0.hzjlqtm.mongodb.net/todolist?retryWrites=true&w=majority");

// Get all the Activities
// URL: http://localhost:3001/getActivities
app.get("/getActivities", async (req, res) => {
    try{
        // Construct the query
        const query = {};

        // Search the database
        const friends = await Activitymodel.find(query);

        // Construct the query
        res.json(friends);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Tell API to start on port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});