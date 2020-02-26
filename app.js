const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const home = require("./controllers/home");
const login = require("./controllers/login");
const app = express();


app.use(session({secret: '17342291', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use('/home', home);
app.use('/',  login);


app.listen(3000, ()=>{
    console.log("Server started at http://localhost:3000/");
});