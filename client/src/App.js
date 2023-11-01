import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  // STATES
  const [description, setDescription] = useState("");
  const [listOfActivities, setListOfActivities] = useState([]);



  // FUNCTIONS
  // Function to add activity
  const addActivity = () => {
    Axios.post("http://localhost:3001/insertActivity", {
      description: description,
      completed: false,
    })
      .then(() => {
        setListOfActivities([...listOfActivities, {description: description, completed: false}]);
      })
      .then(() => {
        alert("Activity: " + description);
      })
      .catch(() => {
        alert("Failed to add activity");
      })
  }

  // APP
  return (
    <div className="App">
      {/* Inputs */}
      <div className="inputs">
        {/* Input for activity */}
        <input type="text" placeholder="Add an activity description" onChange={(event) => {
          setDescription(event.target.value);
        }}></input>

        {/* Button */}
        <button onClick={addActivity}>Add Activity</button>
      </div>

      {/* Activity List */}
      <div className="listOfActivities">
        {listOfActivities.map((val) => {
          return (
            <div className="activityContainer">
              <div className="activity">
                <h3> Activity: {val.description} </h3>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
