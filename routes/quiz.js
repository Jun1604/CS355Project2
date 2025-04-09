var express = require('express');
const fs = require("fs");
const path = require("path");
var router = express.Router();
const questionsDBFileName = "./databases/questions.json";
const gameHistory = "./databases/games.json";
const leaderboard = "./databases/leaderboard.json";
let questionCount;

router.get('/', function(req, res, next) {
    res.render('./main/quiz');
  });

router.get("/api/questions", (req, res) => {
    questionCount = parseInt(req.query.count) || 10;
    const questions = getRandomQuestions(questionCount);
    res.json(questions);
});

router.post("/submitQuiz", (req, res) => {
    const{gameScore, time} = req.body;

    let leaderboard = readleaderboard();
    let gamesDB = readGamesDB();
    let tpq= parseFloat((time/(questionCount*1000))).toFixed(2);

    gamesDB.gameID++;
    const newGame={
        id: req.cookies.userID,
        score: parseInt((gameScore/questionCount)*100),
        TPQ: tpq,
        date: new Date().toLocaleString(),
        gameID: gamesDB.gameID
    }
    
    let rank=-1;
    for(let i=0; i<leaderboard.leaderboard.length; i++){
        if(leaderboard.leaderboard[i].score<= gameScore){
            if(leaderboard.leaderboard[i].TPQ>tpq){
                rank=i;
                break;
            }
        }
    }
    if(rank!=-1){
        const newRank={
            id: req.cookies.userID,
            score: gameScore,
            TPQ: tpq,
            gameID: gamesDB.gameID
        }
        leaderboard.leaderboard.splice(rank,0,newRank);
        leaderboard.leaderboard = leaderboard.leaderboard.slice(0,10);
    }

    gamesDB.games.unshift(newGame);
    writeGamesDB(gamesDB);
    writeleaderboard(leaderboard);
});


function readGamesDB() {
    let data = fs.readFileSync(gameHistory, "utf-8");
    console.log(data);
    return JSON.parse(data);
}

function writeGamesDB(game){
    let data = JSON.stringify(game, null, 2);
    fs.writeFileSync(gameHistory, data, "utf-8");
}

function readleaderboard() {
    let data = fs.readFileSync(leaderboard, "utf-8");
    console.log(data);
    return JSON.parse(data);
}

function writeleaderboard(games){
    let data = JSON.stringify(games, null, 2);
    fs.writeFileSync(leaderboard, data, "utf-8");
}

const rawQuestions = JSON.parse(
    fs.readFileSync(questionsDBFileName, "utf8")
);

const getRandomQuestions = (count = 10) => {
    const shuffled = rawQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
    return shuffled.map(q => ({
        question: q.question,
        answers: [
            { text: q.A, correct: q.answer === "A" },
            { text: q.B, correct: q.answer === "B" },
            { text: q.C, correct: q.answer === "C" },
            { text: q.D, correct: q.answer === "D" }
        ]
    }));
};

module.exports = router;

