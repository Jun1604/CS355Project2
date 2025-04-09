var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const usersDBFileName = "./databases/users.json";
const gameDBFileName = "./databases/games.json";
const leaderboardFileName = "./databases/leaderboard.json";


router.get('/', function(req, res, next) {
    let gameHistory = readGamesDB().games;
    let userDB = readUsersDB().users;
    let userID = req.cookies.userID;
    let leaderboard = readLeaderboard().leaderboard;
    res.render('./main/leaderboard', {
        games: gameHistory,
        users: userDB,
        rankings: leaderboard,
        userID
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

module.exports = router;
