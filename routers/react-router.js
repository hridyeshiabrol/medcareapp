var express=require("express");                     
var path=require("path");

app=express.Router();

//=---------

var userController=require(path.join(__dirname,"..","controllers","user.controller.js"));
app.post("/signup",userController.createUser);
app.post("/login",userController.loginUser);


module.exports=app;
