const express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");
var session = require("express-session");
var app = express();
app.use(express.static("public"));
app.use(bodyparser.json()); //for parsing POST data
app.use(cors());

var PORT = process.env.PORT || 3003;
var fileupload = require("express-fileupload");
app.use(fileupload());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
//--------------connection----------------------------------
const db = require("./config/dbconfig");
var dbConfig = db.dburl;

//-----session-----------------------------------------
app.use(session({
    secret: "any-thing",
    resave: true,
    saveUninitialized: true,
}))

mongoose.connect(dbConfig).then(() => {
    console.log("Connected");
}).catch((err) => {
    console.log(err);
})
app.use(express.urlencoded({
    extended: true
}));
var reactRouter = require("./routers/react-router");
app.use("/api/user", reactRouter);

var profileRouter = require("./routers/profile-router");
app.use("/api/profile", profileRouter);

var medRouter = require("./routers/medicine-router");
app.use("/api/med", medRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "react-app", "build")));
    app.get("*", (req, resp) => {
        resp.sendFile(path.join(__dirname, "react-app", "build", "index.html"));
    })
}

app.listen(PORT, () => {
    console.log("Listening...");
})