✅ Persistent user storage and maintenance (via backend/database)
✅ Customizable user profiles
✅ Editable bio, email, username, and password
✅ Account Handing and Security
✅ Game history tracking and display
✅ Seamless profile update experience
✅ Real-time leaderboard showcasing top-performing users


Project Structure quiz-app/
├── bin
│ └── www
├── databases/
│ ├── questions.json
│ ├── avatar.json
│ ├── games.json
│ ├── leaderboard.json
│ ├──users.json
│ └── profiles.json
├── public/
│ ├── /Images
│  │ ├── img1.jpeg
│  │ ├── img2.jpeg
│  │ ├── img3.jpeg
│  │ └── img4.jpeg
│ ├── /JavaScript
│  │ ├── script.js
│  │ ├── navbar.js  
│  │ ├── profileSettings.js  
│  │ └── darkmode.js  
│ ├── /Stylesheets
│  │ ├── darkmode.css
│  │ ├──  header.css
│  │ ├── homepage.css
│  │ ├── settings.css
│  │ └── style.css
├── routes/
│ ├── auth.js
│ ├── index.js
│ ├── leaderboard.js
│ ├── profile.js
│ ├── quiz.js
│ └── settings.js
├── views/
│ ├── /auth
│  │ ├── header.ejs
│  │ ├── index.ejs
│  │ ├── signin.ejs
│  │ └── signup.ejs
│ ├── /main
│  │ ├── leaderboard.ejs
│  │ ├── mainPage.ejs
│  │ ├── profile.ejs
│  │ ├──quiz.ejs
│  │ ├── quizheader.ejs
│  │ └──settings.ejs
│ └──error.ejs
├── app.js
├──package.json
└── README.md