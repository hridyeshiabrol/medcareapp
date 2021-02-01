var path = require("path");
//Getting Model
var uModel = require(path.join(__dirname, "..", "models", "med.post.js"));

var usermedModel = uModel();

async function createUserWithPic(req, resp) {
  console.log(JSON.stringify(req.body));
  console.log(req.files);
  if (req.files == null) req.body.ppic = "nopic.jpg";
  else {
    req.body.ppic = req.files.ppic.name;

    var fullPath = path.join(__dirname, "..", "medicines", req.body.ppic);

    await req.files.ppic.mv(fullPath, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("File moved...");
      }
    });
  }

  //--------------------
  await usermedModel.create(req.body, (err, result) => {
    if (err) {
      resp.send(err);
      return;
    }
    resp.set("json");
    resp.json({ msg: " Medicine posted with medicine's pic" });
    console.log(result);
  });
}
async function manageMed(req, resp) {
  console.log(req.body.uid);
  await usermedModel
    .find({ uid: req.body.uid })
    .then((result) => {
      console.log(result.length + "  Record found");
      resp.json(result);
    })
    .catch((err) => {
      resp.json({ errmsg: err });
    });
}
async function dodel(req, resp) {
  console.log(req.body.uid);
  console.log(req.body.medname);
  await usermedModel.remove({ uid: req.params.uid, medname: req.params.medname }).then((result) => {
      console.log(result);
      if (result.deletedCount != 0) resp.json({ msg: "Deleted" });
      else resp.json({ msg: "Invalid uid" });
    });
}
async function doFetchCity(req,resp){
    usermedModel.distinct("city")
    .then((result)=>{
        console.log(result);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
async function doFetchMedicine(req,resp){
      var cityy=req.params.city;
      usermedModel.distinct("medname",{city:cityy})
    .then((result)=>{
        console.log(result.length);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
async function doFetchProvider(req,resp){
   console.log(req.params.city);
    console.log(req.params.medname);
    usermedModel.find({city:req.params.city,medname:req.params.medname})
    .then((result)=>{
        console.log(result.length);
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}

module.exports = { createUserWithPic, manageMed,dodel,doFetchCity,doFetchMedicine,doFetchProvider};
