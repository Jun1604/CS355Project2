var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const usersDBFileName = path.join(__dirname, "../databases/users.json");
const avatarDBFileName = path.join(__dirname, "../databases/avatar.json");
const profilesDBFileName = path.join(__dirname, "../databases/profile.json");


function readUsersDB() {
    let data = fs.readFileSync(usersDBFileName, "utf-8");
    return JSON.parse(data);
}

router.get('/', function(req, res, next) {
  if(req.cookies.loggin === "true"){
    return res.render("./main/quiz", {path: getPath(getPicID(req,res))});
  }
  res.render('./auth/index');
});

router.get('/quiz', function(req, res, next) {
  if(req.cookies.loggin === "false") return res.redirect("/");
  return res.render("./main/quiz", {path: getPath(getPicID(req,res))});
});

router.get("/getUser", (req, res) => {
  let users = readUsersDB().users;
  let userName = users.find(user => user.id == req.cookies.userID).userName;  
  res.send(userName);
});

router.post("/update-Pic", (req, res) => {
      const picID = parseInt(req.body.avatar);
      return res.render('./main/quizheader',{ path: getPath(picID) });
});

function readAvatarDB() {
    let data = fs.readFileSync(avatarDBFileName, "utf-8");
    return JSON.parse(data);
}

function getPath(picID){
    let avatarDB = readAvatarDB();
    return ((avatarDB.find(avatar => avatar.picID == picID)).path);
}

function getPicID(req,res){
  let users = readProfilesDB().profiles;
  let picID = (users.find(user => user.id == req.cookies.userID)).imgID;
  return picID;}

function readProfilesDB() {
    let data = fs.readFileSync(profilesDBFileName, "utf-8");
    return JSON.parse(data);
}

module.exports = router;
