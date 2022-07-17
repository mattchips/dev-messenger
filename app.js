//Setting Up Express server 
var express = require("express");
var app = express();
//Assigning PORT number 
const PORT = 3000;
const path = require('path');
//Sequlize 
const sequelize = require('./config/connection');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// temp names until replaced with correct vars
let friends = ['Josh', 'Alex', 'Dave', 'Melissa', 'Chris'];

app.get("/", function (req, res) {
  res.redirect("/register"); //reditect to account creation page 
});

app.get("/friends", function (req, res) {
  res.render("friends.ejs", { friends: friends });
});

app.post("/addFriend", function (req, res) {
  let newFriend = req.body.newFriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

const fs = require('fs');
const generatePage = () => {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="./assets/css/style.css" type="text/css"/>
        <title>Vanilla PHP and JavaScript Stream Group Chat</title>
      </head>
      <body>
        <div class="main-container">
          <div class="login" id="login-block">
            <input
              type="text"
              id="user-login-input"
              placeholder="Enter your username (should be unique)"
            />
          </div>
          <div class="chat-container">
            <div class="users" id="users"></div>
            <div class="message-container">
              <div class="chat-body" id="messages"></div>
              <div class="message-box">
                <input
                  type="text"
                  id="message-input"
                  placeholder="Enter your message..."
                />
              </div>
            </div>
          </div>
        </div>
        <!-- JavaScipt Stream SDK -->
        <script src="https://cdn.jsdelivr.net/npm/stream-chat@1.2.2/dist/browser.full-bundle.min.js"></script>
        <!-- for making http requests -->
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <!-- Our custom JavaScript code -->
        <script src="./custom.js"></script>
      </body>
    </html>
  `;
};

/*
// Initializing the Javascript SDK
let client, channel, username, activeUser;

client = new StreamChat('n5dyzcagg6zw');

// Generating Token
async function generateToken(username) {
  const { token } = (await axios.get(`/token?username=${username}`)).data;
  return token;
}


//setting current user for client SDK
async function initializeClient() {
  const token = await generateToken(username);

  await client.setUser(
    {
      id: username,
      name: 'The user name', // Update this name dynamically
      image: 'https://bit.ly/2u9Vc0r' // user image
    },
    token
  ); // token generated from our Node server

  return client;
}


//User to enter messages
const user = document.getElementById('user-login-input');

user.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    checkAuthState();
  }
});

checkAuthState();

async function checkAuthState() {
  if (!user.value) {
    document.getElementById('login-block').style.display = 'grid';
    document.getElementsByClassName('chat-container')[0].style.display = 'none';
  } else {
    username = user.value;

    await initializeClient();

    document.getElementsByClassName('chat-container')[0].style.display = 'grid';
    document.getElementById('login-block').style.display = 'none';
  }
}
*/
//Temporary commented rom line 73-127

app.get("/register", function (req, res) {
  //render Account creation  page 
  res.render("register.ejs");
});

app.get("/login", function (req, res) {
  //render login page 
  res.render("login.ejs");
});

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  console.log("connected to database ...."); 
  app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
  });
});

//writing file

// fs.writeFile('index.html', generatePage(), err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });