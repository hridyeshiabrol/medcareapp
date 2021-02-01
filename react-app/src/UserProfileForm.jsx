import React, { useState } from "react";
import "./css/userform.css";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function UserProfileForm() {
  var [userObj, setUserObj] = useState({
    uid: "",
    name: "",
    mob:"",
    address: "",
    city: "",
    ppic: null,
  });
  var [fileobj, setFileobj] = useState("./pics/newuser.PNG");

  function doUpdate(event) {
    var { name, value } = event.target;

    setUserObj({
      ...userObj,
      [name]: value,
    });
  }
  function onPicChange(event) {
    setUserObj({ ...userObj, ["ppic"]: event.target.files[0] });
    setFileobj(URL.createObjectURL(event.target.files[0]));
  }
  async function dosave() {
    var url = "api/profile/save";

    var formData = new FormData();
    for (var x in userObj) {
      formData.append(x, userObj[x]);
    }
    var response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(JSON.stringify(response.data));
  }

  async function doUpdateprofile() {
    var url = "api/profile/update";
    var response = await axios.post(url, userObj);
    alert(JSON.stringify(response.data));
  }
  async function doFetchprofile() {
    var url = "api/profile/fetchone";
    var response = await axios.post(url, userObj);
    if (response.data.length === 0) {
      alert("empty");
      return;
    }
    var { uid, name, mob ,address, city, ppic } = response.data[0];
    alert(uid);
    setUserObj({
      uid: uid,
      name: name,
      mob: mob,
      address: address,
      city: city,
      ppic: ppic,
    });
  }
  return (
    <>
      <form>
        <div className="login">
          <div className="loginContainer">
            <center>
              <img
                src={fileobj}
                style={{
                  width: "100px",
                  height: "100px",
                  border: "2px solid black",
                }}
                alt="profile-pic"
              ></img>
            </center>
            <label>
              <b>User's Id:</b>
            </label>
            <input
              type="text"
              name="uid"
              placeholder="Enter user-id"
              value={userObj.uid}
              onChange={doUpdate}
            />
            <label>
              <b>User's Name:</b>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={userObj.name}
              onChange={doUpdate}
            />
            <label>
              <b>Mobile No.</b>
            </label>
            <input
              type="text"
              name="mob"
              placeholder="Enter mobile no."
              value={userObj.mob}
              onChange={doUpdate}
            />
        
            <label>
              <b>Address:</b>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={userObj.address}
              onChange={doUpdate}
            />
            <label>
              <b>City:</b>
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={userObj.city}
              onChange={doUpdate}
            />
            <label>
              <b>Id proof:</b>
            </label>
            <input type="file" onChange={onPicChange}></input>
            <p>
              <center>
                <Button onClick={dosave}>Save</Button> &nbsp;&nbsp;
                <Button onClick={doUpdateprofile}>Update</Button> &nbsp;&nbsp;
                <Button onClick={doFetchprofile}>Fetch</Button>
              </center>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserProfileForm;
