import React, { useState } from "react";
import axios from "axios";
import { Table, Container, Form, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MedicineManager() {
  var [userObj, setUserObj] = useState({
    uid: "",
  });
  var doUpdate = (event) => {
    var { name, value } = event.target;
    setUserObj({
      ...userObj,
      [name]: value,
    });
    console.log(userObj.uid);
  };

  // var [responseMsg, setResponse] = useState("*");
  var [jsonAry, fillJsonArray] = useState([{ uid: "" }]);

  async function doFetchall() {
    var url = "api/med/fetchall";
    var response = await axios.post(url, userObj);
    fillJsonArray(response.data);
    console.log(response.data);
  }
  async function dodelete(uid, medname) {
    var url = "api/med/del-med/" + uid + "/" + medname;
    var response = await axios.post(url, userObj);
    await alert(JSON.stringify(response.data));
    await doFetchall();
  }
  return (
    <>
      <Container className="block-example mt-1">
        <Form>
          <Form.Text>
            <center>
              <h2>
                <b>Medicine Manager</b>
              </h2>
            </center>
          </Form.Text>
          <center><Form.Text className="text-muted">Medicine heals doubts as well as diseases</Form.Text></center>
          
          <Form.Row>
            <Col md={6}>
              <Form.Group controlId="validationCustom01">
                <Form.Label>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user-uid"
                  name="uid"
                  value={userObj.uid}
                  onChange={doUpdate}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
            <br/>
              <Button type="button" variant="info" onClick={doFetchall}>
                <b>Fetch</b>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <br />
        <Table striped bordered hover variant="light" responsive="md">
          <tr>
            <th>S.no</th>
            <th>Uid</th>
            <th>Medicine Name</th>
            <th>Expiry date</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
          <tbody>
            {jsonAry.map((obj, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{obj.uid}</td>
                <td>{obj.medname}</td>
                <td>{obj.expy}</td>
                <td>{obj.qty}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => dodelete(obj.uid, obj.medname)}
                  >
                    Delist
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
export default MedicineManager;
