const fs = require('fs');
const generatePage = () => {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="./style.css" />
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


// Initializing the Javascript SDK
let client, channel, username, activeUser;

client = new StreamChat('<STREAM_APP_KEY>');

// > Again, make sure to replace the `<STREAM_APP_KEY>` placeholder with your own key.
// Next, add a function for generating token to the `public/custom.js` file:
// ```js
// [...]

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

//Express server

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.end('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`app listening at http://localhost:${port}`)
//   });

//writing file

// fs.writeFile('index.html', generatePage(), err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });