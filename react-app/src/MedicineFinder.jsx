import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Card, Col, Container } from "react-bootstrap";

function MedicineFinder() {
  //=---------------------All cities=----------------------
  var [jsonAryCity, filljsonAryCity] = useState(["city"]);

  var [mobile, setmobile] = useState("");
  

  //=------------------Medicines according to city selected=-------
  var [medicineObj, fillMedicine] = useState([]);
  //-=====================-==--=Provider on basis of city and medicine selected
  var [providerObj, fillProviderObj] = useState([]);

  var [finder, fetchfinder] = useState({
    cityy: "",
    medicine: "",
  });
  //=--------------------ONCHANGE-=======================
  var doUpdate = (event) => {
    var { name, value } = event.target;
    fetchfinder({
      ...finder,
      [name]: value,
    });
  };

  //=-------------------=-------USE EFFECT -FETCH ALL DISTINCT CITIES=-------------
  useEffect(async () => {
    var url = "api/med/fetch-all";
    var response = await axios.post(url);
    filljsonAryCity(response.data);
  }, []);

  //=------------------------=--=FETCH ALL MEDICINES ONBASIS OF CITY SELECTED=------------=-=-
  async function doFill(e) {
    doUpdate(e);
    var url = "api/med/fetch-medicine/" + e.target.value;
    var response = await axios.post(url);
    fillMedicine(response.data);
    var { mobile } = response.data[0];
    // alert(mobile);
    setmobile(mobile);
  }

  //=----------------------------FETCH ALL DETAILS AND SHOW IN CARD-==========================
  async function showCard(finder) {
    var url =
      "api/med/fetch-provider/" +
      finder.cityy +
      "/" +
      finder.medicine;
    var response = await axios.post(url);
    fillProviderObj(response.data);
    alert(JSON.stringify(response.data));
  }

  //=-------------------------------=-=-=-TO FETCH MOBILE NUMBER=------------------------
  async function doFetchProviderDetails(obj,mobile) {
    var url = "api/profile/fetch-profile";
    var response = await axios.post(url, obj);
    alert(JSON.stringify(response.data));
    setmobile(response.data[0]);
  }

  return (
    <div>
      <center>
        {/* =--------------============---------CITY=--------=-------------------------- */}
        City:{" "}
        <select
          id="template-select"
          value={finder.cityy}
          name="cityy"
          onChange={doFill}
        >
          <option>Select City</option>
          {jsonAryCity.map((obj) => {
            return <option value={obj}>{obj}</option>;
          })}
        </select>
        &nbsp;&nbsp;
        {/* =--------------============---------MEDICINE=--------=-------------------------- */}
        Medicine:
        <select
          id="template-select"
          value={finder.medicine}
          name="medicine"
          onChange={doUpdate}
        >
          <option>Select Medicine</option>
          {medicineObj.map((obj) => {
            return <option value={obj}>{obj}</option>;
          })}
        </select>
        <br></br>
        {/* =--------------============---------FIND MEDICINE PROVIDERS=--------=-------------------------- */}
        <br></br>
        <Button variant="info" onClick={() => showCard(finder)}>
          Find Medicine Providers
        </Button>
      </center>

      {/* =--------------============---------SHOW IN CARDS=--------=-------------------------- */}

      {providerObj.map((obj) => {
        return (
          <Container>
            <Col md={4}>
              <Card>
                <Card.Body
                  style={{
                    backgroundColor: "darkgray",
                    color: "white",
                  }}
                >
                  <center>
                    {" "}
                    <Card.Title>
                      User Name:-{obj.uid} <br />{" "}
                    </Card.Title>{" "}
                  </center>
                  <Card.Text>
                    <h6>Medicine's Name:{obj.medname}</h6>
                    <p>Quantity:{obj.qty}</p>
                    <p>Expiry Date:{obj.expy}</p>
                    <p>Units:{obj.unitss}</p>
                  </Card.Text>
                  <center>
                    {" "}
                    <Button
                      variant="info"
                      onClick={() => {
                        doFetchProviderDetails(obj)
                      }}
                    >
                      Details
                    </Button>
                  </center>
                </Card.Body>
              </Card>
            </Col>
          </Container>
        );
      })}
      <Container>
      </Container>
    </div>
  );
}

export default MedicineFinder;
