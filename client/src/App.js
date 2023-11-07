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

  // Function to update an activity
  const updateActivity = (id) => {
    const newDescription = prompt("Enter a new activity description: ");

    Axios.put(`http://localhost:3001/updateActivity/${id}`, {description: newDescription})
      .then(() => {
        setListOfActivities(listOfActivities.map((val) => {
          return val._id === id ? {_id: id, description: newDescription, completed: val.completed} : val
        }))
      })
      .catch(() => {
        alert("Failed to update activity");
      });
  };

  // Function to set an activity's completion
  const changeActivityToCompleted = (id) => {
    Axios.put(`http://localhost:3001/updateActivity/${id}`, {completed: true})
      .then(() => {
        setListOfActivities(listOfActivities.map((val) => {
          return val._id === id ? {_id: id, description: val.description, completed: true} : val
        }))
      })
      .catch(() => {
        alert("Failed to change activity completion");
      });
  };

  // Function to set an activity to not completed
  const changeActivityToNotCompleted = (id) => {
    Axios.put(`http://localhost:3001/updateActivity/${id}`, {completed: false})
      .then(() => {
        setListOfActivities(listOfActivities.map((val) => {
          return val._id === id ? {_id: id, description: val.description, completed: false} : val
        }))
      })
      .catch(() => {
        alert("Failed to change activity to not completed");
      });
  }


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
                <h4> Completed: {val.completed.toString()} </h4>
              </div>
              <button onClick={() => updateActivity(val._id)}>Update</button>
              <button onClick={() => deleteActivity(val._id)}>Delete</button>
              <button onClick={() => changeActivityToCompleted(val._id)}>Completed</button>
              <button onClick={() => changeActivityToNotCompleted(val._id)}>Not completed</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;


// Next steps:
// * Allow the user to change a task from completed to uncompleted and vice versa
