import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  // STATES
  const [description, setDescription] = useState("");
  const [listOfActivities, setListOfActivities] = useState([]);



  // FUNCTIONS
  // useEffect function to send a get request
  useEffect(() => {
    // Function to fetch activities
    const fetchActivities = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/getActivities");
        setListOfActivities(response.data);
      } catch (error) {
        console.log("Failed to fetch list of activities", error);
      }
    };

    // Call the fetchActivities function
    fetchActivities();
  }, []); // Empty dependency array ensures this effect runs once after the initial render


  // Function to add activity
  const addActivity = () => {
    Axios.post("http://localhost:3001/insertActivity", {
      description: description,
      completed: false,
    })
      .then((response) => {
        // Update state based on the respnse data from the server
        setListOfActivities([...listOfActivities, response.data]);
        
        // Clear the input field after adding the activity
        var activityInput = document.getElementById('activityInput');
        activityInput.value = '';

        alert("Activity added: " + description);
      })
      .catch(() => {
        alert("Failed to add activity");
      });
  };


  // Function to delete an activity
  const deleteActivity = (id) => {
    Axios.delete(`http://localhost:3001/deleteActivity/${id}`)
      .then(() => {
        setListOfActivities(listOfActivities.filter((activity) => activity._id !== id)); 
      })
      .catch(() => {
        alert("Failed to delete activity");
      });
  };



  // APP
  return (
    <div className="App">
      {/* Inputs */}
      <div className="inputs">
        {/* Input for activity */}
        <input type="text" placeholder="Add an activity description" id="activityInput" onChange={(event) => {
          setDescription(event.target.value);
        }}></input>

        {/* Button */}
        <button onClick={addActivity}>Add Activity</button>
      </div>

      {/* Activity List */}
      <div className="listOfActivities">
        {listOfActivities.map((val, index) => {
          return (
            <div className="activityContainer">
              <div className="activity">
                <h3>{index + 1}.</h3>
                <h3> Activity: {val.description} </h3>
              </div>

              <button onClick={() => deleteActivity(val._id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
