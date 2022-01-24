import React from "react";

import "./NewList.css";

import { post } from "../../utilities";

const NewList = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        //const body = { parent: props.storyId, content: value };

        var formData = new FormData(document.newlist);


        const body = { };

        // var object = {};
        formData.forEach(function(value, key){
        //     object[key] = value;
            body[key] = value;
        });
        // //var json = JSON.stringify(object);


        post("/api/newlist", body).then((newlist) => {
            alert(newlist);
            window.location = "/list/" + newlist._id;
          });
      };

  return (
    <>
        <form action="/api/newlist" method="POST" name="newlist">
        <div className="newlist">
            <h3>GENDER</h3>
            <select type="select" name="gender">
            <option value="1">Item 1</option>
            <option value="2">Item 2</option>
            <option value="3">Item 3</option>
            <option value="4">Item 4</option>
            <option value="5">Item 5</option>
            </select>
        </div>

        <div className="newlist">
            <h3>DURATION</h3>
            <input type="text" defaultValue="1" name="nights" />nights
        </div>

        <div className="newlist">
            <h3>TEMPERATURE (at destination)</h3>
            <input type="text" value="9" name="degrees" />degrees
        </div>

        <div className="newlist">
            <h3>DOING LAUNDRY?</h3>
            <select type="select" name="laundry">
            <option value="1">Yes</option>
            <option value="0">No</option>
            </select>

            <h3>LUGGAGE PREFERENCE</h3>
            <select type="select" name="luggage">
                <option value="light">Light/minimal</option>
                <option value="regular">Regular</option>
                <option value="comfortable">Comfortable</option>
            </select>
        </div>

        <div className="newlist">
            <h3>MAIN ACTIVITY(IES)</h3>
            Select at most 2:<br />
            <input type="checkbox" value="skiing" name="activity" />
            Skiing<br />
            <input type="checkbox" value="hiking" name="activity" />
            Hiking<br />
            <input type="checkbox" value="swimming" name="activity" />
            Swimming/beaching<br />
            <input type="checkbox" value="sightseeing" name="activity" />
            Sightseeing/shopping<br />
            <input type="checkbox" value="business" name="activity" />
            Business-related
        </div>

        <div className="newlist">
            <h3>FORM OF TRAVEL</h3>
            <input type="checkbox" value="business" name="travel" />
            Plane
            <input type="checkbox" value="business" name="travel" />
            Train
            <input type="checkbox" value="business" name="travel" />
            Car
            <input type="checkbox" value="business" name="travel" />
            Boat/cruise
        </div>

        <div className="newlist">
            <input type="submit" value="Create List" onClick={handleSubmit} />
        </div>
        </form>
    </>
  );
};

export default NewList;