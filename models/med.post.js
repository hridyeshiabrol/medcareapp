var mongoose =require("mongoose");

function getmedModel()
{
    var PostmedSchemaObj = new mongoose.Schema({
        uid: String,
        medname : String,
        city : String ,
        expy: Date,
        qty: String,
        unitss: String,
        ppic: String
});

var postmedModel = mongoose.model("postedmedicines", PostmedSchemaObj);
return postmedModel;
}
module.exports=getmedModel;