var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const userDBFileName = path.join(__dirname, "../databases/users.json");
const profileDBFileName = path.join(__dirname, "../databases/profile.json");


router.get('/signin', function(req, res, next) {
    renderSignin(req,res);
});

router.get('/signup', function(req, res, next) {
    renderSignup(req, res);
});

router.post("/signin/submit", (req, res) => {
    if (!req.body.email || !req.body.password) {
        return renderSignin(req, res, "Email and password cannot be empty.");
    }

    let userDB = readUserDB();
    for(let user of userDB.users){
        if((user.email).toUpperCase() === (req.body.email).toUpperCase() 
            && user.password == req.body.password){
                res.cookie("userID", user.id);
                return renderHome(req, res);
        }
    }
    return renderSignin(req, res, "Incorrect username or password. Try again");
});

router.post("/signup/submit", (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.userName) {
        return renderSignup(req, res, "Fields cannot be empty.");
    }

    let userDB = readUserDB();
    let profileDB = readProfileDB();
    let userName= req.body.userName
    let email = req.body.email
    for(let user of userDB.users){
        if((user.email).toUpperCase() == (email).toUpperCase()){
            return renderSignup(req, res, "Email is already used. Try again");
        }
        if((user.userName).toUpperCase() === (userName).toUpperCase()){
            return renderSignup(req, res, "Username already taken. Try again");
        }
    }
    userDB.userCount++;

    const newUser={
        "id": userDB.userCount,
        "userName": userName,
        "email": email,
        "password": req.body.password
    }

    const newProfile={
        "id": userDB.userCount,
        "imgID":"0",
        "bio":""
    }
    res.cookie("userID", userDB.userCount );
    userDB.users.push(newUser);
    profileDB.profiles.push(newProfile);
    writeUserDB(userDB); 
    writeProfileDB(profileDB);    
    renderHome(req, res);
});

router.get('/logout', function(req, res) {
    res.cookie("loggin", "false");
    res.clearCookie("userID");
    res.redirect("/");
});

function renderSignup(req, res, msg){
    res.render('./auth/signup', {msg: msg});
}

function renderSignin(req, res, msg){
    res.render('./auth/signin', {msg: msg});
}

function renderHome(req, res) {
    res.cookie("loggin", "true");
    res.redirect("/quiz");
}

function readUserDB() {
    let data = fs.readFileSync(userDBFileName, "utf-8");
    console.log(data);
    return JSON.parse(data);
}

function writeUserDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(userDBFileName, data, "utf-8");
}

function readProfileDB() {
    let data = fs.readFileSync(profileDBFileName, "utf-8");
    console.log(data);
    return JSON.parse(data);
}

function writeProfileDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(profileDBFileName, data, "utf-8");
}

module.exports = router;