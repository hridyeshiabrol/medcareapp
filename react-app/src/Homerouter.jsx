import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserProfileForm from "./UserProfileForm";
import MedicineManager from "./MedicineManager";
import AvailMedicine from "./AvailMedicine";
import MedicineFinder from "./MedicineFinder";

function Homerouter() {
  return (
    <>
      <Switch>
         <Route path="/" exact component={frontPage}></Route>
          <Route path="/Dashboard" exact component={Dashboard}></Route>
          <Route path="/UserProfileForm" exact component={UserProfileForm}></Route>
          <Route path="/MedicineManager" exact component={MedicineManager}></Route>
          <Route path="/AvailMedicine" exact component={AvailMedicine}></Route>
          <Route path="/MedicineFinder" exact component={MedicineFinder}></Route>
      </Switch>
    </>
  );
}

 function frontPage()
{
  return (
    <h2>Welcome Page<br></br>
    </h2>
  );
} 

export default Homerouter;