var path = require("path");
var uModel = require(path.join(__dirname, "..", "models", "user.model.js"));

var userModel = uModel();

async function createUser(req, resp) {
  await userModel.create(req.body, (err, result) => {
    if (err) {
      resp.send(err);
      return;
    }
    resp.set("json");
    resp.json({ msg: " You are signed up successfully!" });
    console.log(result);
  });
}

// async function loginUser(req, resp) {

//   await userModel.findOne({ uid: req.body.uid }, (err, foundUser) => {
//     if (err) console.log(err);
//     else {
//       if (foundUser) {
//         if (foundUser.pwd == req.body.pwd) {
//           console.log("Log in Successfully! ");
//           resp.send(" Log in Successfully!");
//           // res.redirect("/src/Components/UserDashboard.jsx");
//         } else {
//           resp.send("Invalid userid or password");
//           console.log("Invalid userid or password");
//         }
//       }
//     }
//   });
// }
var loginUser= async (req,resp) => {
    var uid= req.body.uid;
    var userData = await userModel.findOne({ uid : uid })

    if(userData)
    {
        if(req.body.pwd  == userData.pwd){
            req.session.activeuser = uid 
            resp.send("Welcome "+ req.session.activeuser)
            console.log(req.session.activeuser)
        }
        else
        {
            resp.send("Invalid password")
        }
    }
    else resp.send("Invalid user id")
}

module.exports = { createUser, loginUser };
