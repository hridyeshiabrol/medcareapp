import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function NavbarRouter() {
  var [showsignup, setShowSignup] = useState(false);
  var handleCloseSignup = () => setShowSignup(false);
  var handleShowSignup = () => setShowSignup(true);

  var [showlogin, setShowLogin] = useState(false);
  var handleCloseLogin = () => setShowLogin(false);
  var handleShowLogin = () => setShowLogin(true);

  var [userObj, setUserObj] = useState({
    uid: "",
    pwd: "",
    mob: "",
  });
  var doUpdate = (e) => {
    var { name, value } = e.target;
    setUserObj({
      ...userObj,
      [name]: value,
    });
  };
  async function doSignup() {
    var url = "api/user/signup";
    var response = await axios.post(url, userObj);
    alert(JSON.stringify(response.data));
  }
  async function doLogin() {
    var url = "api/user/login";
    var response = await axios.post(url, userObj);
    alert(JSON.stringify(response.data));
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        sticky="top"
        bg="dark"
        expand="lg"
        variant="dark"
      >
        <Navbar.Brand href="#home">
          <i>
            {" "}
            <img
              src={"./pics/medcarelogo.PNG"}
              alt="POSTMED"
              style={{ width: "60px", height: "50px" }}
            />{" "}
          </i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" exact>
              <b>Home</b>
            </Nav.Link>
            <Nav.Link href="#" exact>
              <b>Contact us</b>
            </Nav.Link>
            <Nav.Link href="#" exact>
              <b>About us</b>
            </Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link onClick={handleShowSignup}>
              <b>Signup</b>
            </Nav.Link>
            <Nav.Link onClick={handleShowLogin}>
              <b>Login</b>
            </Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {/*--------signup modal-------------*/}
      <Modal
        show={showsignup}
        onHide={handleCloseSignup}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Register
            <Form.Text className="text-muted">Create new account </Form.Text>
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Id : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user-id"
                required="required"
                name="uid"
                value={userObj.uid}
                onChange={doUpdate}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password : </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your password"
                required="required"
                name="pwd"
                value={userObj.pwd}
                onChange={doUpdate}
              />
            </Form.Group>
            <Form.Group controlId="formBasicmobile">
              <Form.Label>Mobile :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your contact no."
                required="required"
                name="mob"
                value={userObj.mob}
                onChange={doUpdate}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="I accept the Terms of Use & Privacy Policy"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary btn-block"
              type="button"
              onClick={doSignup}
            >
              {" "}
              Create{" "}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {/*--------login modal-------------*/}
      <Modal show={showlogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login Here</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your user-id"
                required="required"
                name="uid"
                value={userObj.uid}
                onChange={doUpdate}
              />
              <br></br>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.{" "}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required="required"
                name="pwd"
                value={userObj.pwd}
                onChange={doUpdate}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary btn-block" type="button" onClick={doLogin}>
              {" "}
              Login{" "}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default NavbarRouter;
