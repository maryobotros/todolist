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


// GET all the Activities
// URL: http://localhost:3001/getActivities
app.get("/getActivities", async (req, res) => {
    try {
        // Construct the query
        const query = {};

        // Search the database
        const friends = await ActivityModel.find(query);

        // Construct the response and send it back
        res.json(friends);
    } catch (err) {
        res.status(500).json(err);
    }
});


// POST a new activity
// URL: http://localhost:3001/insertActivity
app.post("/insertActivity", async (req, res) => {
    try {
        // Create a new activity based on what's passed into the bodt and save it
        const activity = req.body;
        const newActivity = ActivityModel(activity);
        await newActivity.save();

        // Construct the response and send it back
        res.json(newActivity);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Tell API to start on port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});