var express=require("express");                     
var path=require("path");

app=express.Router();

var medController=require(path.join(__dirname,"..","controllers","medicine.controller.js"));

app.post("/savemed",medController.createUserWithPic);
app.post("/fetchall",medController.manageMed);
app.post("/del-med/:uid/:medname",medController.dodel);

app.post("/fetch-all",medController.doFetchCity);
app.post("/fetch-medicine/:city",medController.doFetchMedicine);
app.post("/fetch-provider/:city/:medname",medController.doFetchProvider);
module.exports=app;