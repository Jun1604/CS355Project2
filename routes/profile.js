var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const gameDBFileName = path.join(__dirname, "../databases/games.json");
const usersDBFileName = path.join(__dirname, "../databases/users.json");
const avatarDBFileName = path.join(__dirname, "../databases/avatar.json");
const profilesDBFileName = path.join(__dirname, "../databases/profile.json");

router.get('/', function(req, res, next) {
    let gameHistory = readGamesDB();
    let userDB = readUsersDB();
    let userID = req.cookies.userID;
    res.render('./main/profile', {
        games: gameHistory.games,
        users: userDB.users,
        userID,
        path: getPath(getPicID(req,res))
    });    
});


function readGamesDB() {
    let data = fs.readFileSync(gameDBFileName, "utf-8");
    return JSON.parse(data);
}
function readUsersDB() {
    let data = fs.readFileSync(usersDBFileName, "utf-8");
    return JSON.parse(data);
}


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
