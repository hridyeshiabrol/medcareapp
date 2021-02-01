import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import "./css/postform.css";

function AvailMedicine() {
  var [userObj, setUserObj] = useState({
    uid: "",
    medname: "",
    city : "",
    expy: "",
    qty: "",
    unitss: "",
    ppic: null,
  });
  var [fileobj, setFileobj] = useState("./pics/med.PNG");

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
    var url = "api/med/savemed";

    var formData = new FormData();
    for (var x in userObj) {
      formData.append(x, userObj[x]);
    }
    var response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(JSON.stringify(response.data));
  }
  return (
    <div id="body">
      <span>
        <Row container spacing={1}>
          <Col container item md={6} spacing={3}>
            <img
              src={"./pics/postmedimg.PNG"}
              alt="POSTMED"
              style={{ width: "100%", height: "750px" }}
            />
          </Col>
          <Col container item md={6} spacing={3}>
            <form>
              <div>
                <center>
                  <h1>
                    <b>Post Available Medicine</b>
                  </h1>
                </center>
                <div id="container">
                  <form>
                    <label>User Id:</label>
                    <p>
                      <input
                        type="text"
                        name="uid"
                        placeholder="Enter your id"
                        value={userObj.uid}
                        className="box"
                        onChange={doUpdate}
                      />
                    </p>
                    <label>Medicine Name:</label>
                    <p>
                      <input
                        type="text"
                        name="medname"
                        placeholder="Enter name of the medicine"
                        value={userObj.medname}
                        className="box"
                        onChange={doUpdate}
                      />
                    </p>
                    <label>City:</label>
                    <p>
                      <input
                        type="text"
                        name="city"
                        placeholder="Enter name of the city"
                        value={userObj.city}
                        className="box"
                        onChange={doUpdate}
                      />
                    </p>
                    <label>Expiry Date:</label>
                    <p>
                      <input
                        type="date"
                        name="expy"
                        className="box"
                        value={userObj.expy}
                        onChange={doUpdate}
                      />
                    </p>
                    <label>Quantity:</label>
                    <p>
                      <input
                        type="number"
                        name="qty"
                        placeholder="Enter quantity of medicine"
                        className="box"
                        value={userObj.qty}
                        onChange={doUpdate}
                      />
                    </p>
                    <label>Units:</label>
                    <p>
                      <input
                        type="text"
                        name="unitss"
                        value={userObj.unitss}
                        placeholder="Enter units"
                        className="box"
                        onChange={doUpdate}
                      />
                    </p>
                    <label>Upload Image of medicine</label>
                    <p>
                      <input
                        type="file"
                        onChange={onPicChange}
                        className="box"
                      />
                    </p>
                    <center>
                      <img
                        src={fileobj}
                        style={{
                          width: "150px",
                          height: "100px",
                          border: "0px solid black",
                        }}
                        alt="med-pic"
                      ></img>
                    </center>
                    <center>
                      <br />
                      <p>
                        <Button variant="danger btn-block" onClick={dosave}>
                          POST
                        </Button>
                      </p>
                    </center>
                  </form>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </span>
    </div>
  );
}

export default AvailMedicine;
