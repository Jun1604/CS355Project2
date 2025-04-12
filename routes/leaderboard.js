var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const usersDBFileName = path.join(__dirname, "../databases/users.json");
const gameDBFileName = path.join(__dirname, "../databases/games.json");
const leaderboardFileName = path.join(__dirname, "../databases/leaderboard.json");
const avatarDBFileName = path.join(__dirname, "../databases/avatar.json");
const profilesDBFileName = path.join(__dirname, "../databases/profile.json");

router.get('/', function(req, res, next) {
    let gameHistory = readGamesDB().games;
    let userDB = readUsersDB().users;
    let userID = req.cookies.userID;
    let leaderboard = readLeaderboard().leaderboard;
    res.render('./main/leaderboard', {
        games: gameHistory,
        users: userDB,
        rankings: leaderboard,
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
function readLeaderboard() {
    let data = fs.readFileSync(leaderboardFileName, "utf-8");
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
