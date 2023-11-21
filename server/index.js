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
        // Create a new activity based on what's passed into the body and save it
        const activity = req.body;
        const newActivity = ActivityModel(activity);
        await newActivity.save();

        // Construct the response and send it back
        res.json(newActivity);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE an activity by ID
// URL: http://localhost:3001/deleteActivity/:activityId
app.delete("/deleteActivity/:activityId", async (req, res) => {
    try {
        // Get the activity ID
        const activityId = req.params.activityId;

        // Attempt to find the friend by ID and remove it
        const deletedActivity = await ActivityModel.findByIdAndDelete(activityId);

        // If the friend is not found, return 404 status
        if (!deletedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Friend successfully deleted, return success message
        res.json({ message: "Activity deleted successfully" });
    } catch (err) {
        res.status(500).json(err); // Handle the error with a 500 status code
    }
});

// PUT to update an activity by ID
// URL: http://localhost:3001/updateActivity/:activityId
app.put("/updateActivity/:activityId", async (req, res) => {
    try {
        // Get the activity ID and new info
        const activityID = req.params.activityId;
        const updatedActivityData = req.body;

        // Attempt to find the actvitity by ID and uodate it with the new data
        const updatedActivity = await ActivityModel.findByIdAndUpdate(activityID, updatedActivityData, { new: true });

        // If the activity is not found, return 404 status 
        if (!updatedActivity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        // Return the updated activity
        res.json(updatedActivity);
    } catch (err) {
        res.status(500).json(err); // Handle the error with a 500 status code 
    }
});


// Tell API to start on port 3001
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});