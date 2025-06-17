// App.js

//variable
const express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
const res = require("express/lib/response");
const User = require("./model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./model/Verify");
let app = express();

mongoose.connect("mongodb://localhost/27017");

app.get("/secret", verifyToken, (req, res) =>  {
    res.status(200).json({
        message: "protected route accessed"
    })
});

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "the password",
    resave: false,
    saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req,res){
    res.render("home");
});

//app.get("/secret", function (req,res){
//    res.render("secret");
//});

app.get("/register", function (req,res){
    res.render("register");
});

app.post("/register", async(req,res) => {
   const createdAt = new Date()
   const hashed = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
        username:req.body.username,
        password: hashed,
        created: createdAt
    });
    return res.status(200).json(user);
});

app.get("/login", function (req,res){
    res.render("login");
});



app.post("/login", async function (req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                res.render("secret");
                const token = jwt.sign({userid: user_id}, "secret key", {expiresIn: "1h"})
                //return;
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started!");
});

