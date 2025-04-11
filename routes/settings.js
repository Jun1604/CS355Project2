var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const usersDBFileName = "./databases/users.json";
const profilesDBFileName = "./databases/profile.json";
const avatarDBFileName = "./databases/avatar.json";

router.get('/', function(req, res, next) {
    // let profilesDB = readProfilesDB();
    // let picID = profilesDB.profiles.find(profile => profile.id == req.cookies.userID).imgID;
    // let avatarDB = readAvatarDB();
    // let src = avatarDB.find(avatar => avatar.picID == picID).path;
    return renderSettings(req,res);
});

router.post('/update-pPic', (req, res) => {
    console.log(req.body);
    const picID = req.body.picRadio;
    console.log(picID);
    let profilesDB = readProfilesDB();  
    (profilesDB.profiles.find(profile => profile.id == req.cookies.userID)).imgID = picID ;
    writeProfilesDB(profilesDB);
    let avatarDB = readAvatarDB();
    let picPath = avatarDB.find(avatar => avatar.picID == picID).path;
    return renderSettings(req,res);

});

router.post('/changeBio', (req, res) => {
    let profileDB = readProfilesDB();
    let bio = req.body.bio;
    (profileDB.profiles.find(profile=> profile.id== req.cookies.userID)).bio = bio;
    writeProfilesDB(profileDB);
    return renderSettings(req,res);
});

router.post('/changeUser', (req, res) => {
    let userDB = readUsersDB();
    let user = req.body.userName;
    if(!user){
        console.log("Ignoring");
        return renderSettings(req,res);
    }
    console.log(user);
    (userDB.users.find(users=> users.id== req.cookies.userID)).userName = user;
    writeUserDB(userDB);
    return renderSettings(req,res);
});

router.post('/changeEmail', (req, res) => {
    let userDB = readUsersDB();
    let email = req.body.email;
    if(!email){
        console.log("Ignoring");
        return renderSettings(req,res);
    }
    console.log(email);
    (userDB.users.find(users=> users.id== req.cookies.userID)).email =email;
    writeUserDB(userDB);
    return renderSettings(req,res);
});

router.post('/changePassword', (req, res) => {
    let userDB = readUsersDB();
    let pass = req.body.password;
    if(!pass){
        console.log("Ignoring");
        return renderSettings(req,res);
    }
    (userDB.users.find(users=> users.id== req.cookies.userID)).password =pass;
    writeUserDB(userDB);
    return renderSettings(req,res);
});

function readUsersDB() {
    let data = fs.readFileSync(usersDBFileName, "utf-8");
    return JSON.parse(data);
}

function readAvatarDB() {
    let data = fs.readFileSync(avatarDBFileName, "utf-8");
    return JSON.parse(data);
}

function writeUserDB(users){
    let data = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersDBFileName, data, "utf-8");
}

function readProfilesDB() {
    let data = fs.readFileSync(profilesDBFileName, "utf-8");
    return JSON.parse(data);
}

function writeProfilesDB(profiles){
    let data = JSON.stringify(profiles, null, 2);
    fs.writeFileSync(profilesDBFileName, data, "utf-8");
}

function getPath(picID){
    let avatarDB = readAvatarDB();
    return ((avatarDB.find(avatar => avatar.picID == picID)).path);
}

function getPicID(req,res){
  let users = readProfilesDB().profiles;
  let picID = (users.find(user => user.id == req.cookies.userID)).imgID;
  return picID;}

function getBio(req,res){
    let users = readProfilesDB().profiles;
    let bio = (users.find(user => user.id == req.cookies.userID)).bio;
    return bio;
}

function getUser(req,res){
    let users = readUsersDB().users;
    let userName = (users.find(user => user.id == req.cookies.userID)).userName;
    return userName;
}
function getEmail(req,res){
    let users = readUsersDB().users;
    let email = (users.find(user => user.id == req.cookies.userID)).email;
    return email;
}
function getPassword(req,res){
    let users = readUsersDB().users;
    let password = (users.find(user => user.id == req.cookies.userID)).password;
    return password;
}

function renderSettings(req,res){
    return (res.render('./main/settings',{path:getPath(getPicID(req,res)), bio: getBio(req,res), userName:getUser(req,res), email:getEmail(req,res), password:getPassword(req,res)}));
}

module.exports = router;
