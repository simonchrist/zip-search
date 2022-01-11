import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [apiResponse, allResponses] = useState([]);
  const getResponse = async () => {
    
    let zipcode = document.getElementById("zip").value;

    if (zipcode.length === 5) {
      await axios
        .get('http://ctp-zip-api.herokuapp.com/zip/' + zipcode)
        .then(response => {
          allResponses(response.data);
        })
        .catch(error => {
          console.log(error.response.data.error);
        })
    }
    else
      allResponses(["Nothing Found"]);
  }

  return (
    <div className="App">
      <h1 className='title'>Search Zip Code</h1>
        <label htmlFor="zip" className="input"><b>Zip Code:</b></label>
          <div>
            <input type="text" id="zip" className="form" onChange={getResponse}/>
          </div>
      {
        apiResponse.map(event => {
          return event === "Nothing Found" ? <p key={event}>{event}</p> : 
          (
            <div key={event.RecordNumber}>            
              <div className='box'>
                <div className='box1'>{event.LocationText}</div>
                    <ul>
                      <li>State: {event.State ? event.State : "Null"}</li>
                      <li>Location: ({event.Lat ? event.Lat : "Null"}, {event.Long ? event.Long : "Null"})</li>
                      <li>Estimated Population: {event.EstimatedPopulation ? event.EstimatedPopulation : "Null"}</li>
                      <li>Total Wages: {event.TotalWages ? event.TotalWages : "Null"}</li>
                    </ul>
                  </div>
                </div>
          )
        })
      }
    </div>
  );
}

export default App;