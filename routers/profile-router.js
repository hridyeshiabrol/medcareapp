var express=require("express");                     
var path=require("path");

app=express.Router();

var profileController=require(path.join(__dirname,"..","controllers","profile.controller.js"));

app.post("/save",profileController.createUserWithPic);
app.post("/update",profileController.doUpdate);
app.post("/fetchone",profileController.doFetchOne);
app.post("/fetch-profile",profileController.doFetchprofile);
module.exports=app;