var mongoose =require("mongoose");

function getProfileModel()
{
    var UserSchemaObj=new mongoose.Schema({
        uid : {type:String,index:true,unique:true},
        name : String,
        mob : String,
        address: String,
        city: String,
        ppic: String
});

var userprofileModel=mongoose.model("profile-form-users",UserSchemaObj);
return userprofileModel;
}
module.exports=getProfileModel;
